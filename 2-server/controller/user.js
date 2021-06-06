const bcrypt = require('bcrypt');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const log = require('../logger');
const { userValidation } = require('../validation');

const { User } = require('../db/models');

exports.getUsersData = async (req, res, next) => {
	try {
		const id = res.user.sub;
		const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

		if (!user) return next(createError.NotFound('User not found!'));

		return res.status(StatusCodes.OK).json({
			success: true,
			data: user
		});
	} catch (error) {
		next(error);
	}
};

exports.updateUsersProfile = async (req, res, next) => {
	try {
		const id = res.user.sub;
		const { error } = userValidation(req.body);
		if (error) return next(createError.BadRequest(error.details[0].message));

		const { firstName, lastName, username, email, password } = req.body;

		//Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const validateUser = await User.findOne({
			where: {
				[Op.and]: [{ id: { [Op.not]: id } }, { [Op.or]: [{ email }, { username }] }]
			}
		});
		if (validateUser?.username === username) return next(createError.BadRequest('Username already exists!'));
		if (validateUser?.email === email) return next(createError.BadRequest('Email already exists!'));

		await User.update(
			{
				firstName,
				lastName,
				username,
				email,
				password: hashedPassword
			},
			{ where: { id } }
		);

		log.info(`user's profile[${id}] has updated`);
		return res
			.status(StatusCodes.OK)
			.json({ success: true, message: 'You are updated your profile successfully.', user: id });
	} catch (error) {
		next(error);
	}
};
