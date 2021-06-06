const crypto = require('crypto');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const log = require('../logger');
const { emailValidation } = require('../validation');
const { addNewUser, addExistingUser } = require('../helper/email');

const models = require('../db/models');

exports.addNewUserToProject = async (req, res, next) => {
	try {
		const { error } = emailValidation(req.body);
		if (error) return next(createError.BadRequest(error.details[0].message));

		const { emailFrom, emailTo } = req.body;
		const projectId = +req.params.projectId;

		const username = emailTo.split('@')[0];
		const password = crypto.randomBytes(8).toString('base64');

		//Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const transactionRespone = await models.sequelize.transaction(async transaction => {
			const [respone, created] = await models.User.findOrCreate({
				where: {
					email: emailTo
				},
				defaults: {
					username,
					email: emailTo,
					password: hashedPassword,
					roleId: 2
				},
				transaction
			});

			if (created) {
				await addNewUser({ username, password, emailFrom, emailTo });
				await respone.setProjects(projectId, {
					transaction
				});
			} else if (respone.email === emailTo) {
				await addExistingUser({ emailFrom, emailTo });
				await respone.setProjects(projectId, {
					transaction
				});
			}
			log.info(`user[${respone.id}] was added to project`);
			return {
				success: true,
				message: 'Email was sent succesfully!',
				userId: respone.id,
				projectId
			};
		});

		return res.status(StatusCodes.OK).json(transactionRespone);
	} catch (error) {
		next(error);
	}
};
