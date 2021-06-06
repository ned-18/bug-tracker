const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const log = require('../logger');
const { projectValidation } = require('../validation');

const models = require('../db/models');

exports.createProject = async (req, res, next) => {
	try {
		const { error } = projectValidation(req.body);
		if (error) return next(createError.BadRequest(error.details[0].message));
		const user = res.user;
		const { name, category, description } = req.body;

		const respone = await models.sequelize.transaction(async transaction => {
			const newProject = await models.Project.create(
				{
					name,
					category,
					description,
					status: 'inprogress'
				},
				{
					transaction
				}
			);

			await newProject.setUsers(user.sub, {
				transaction
			});

			return {
				id: newProject.id,
				username: user.username,
				createdAt: newProject.createdAt
			};
		});

		log.info(`project[${respone.id}] was created`);
		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'The project was successfully created.',
			data: respone
		});
	} catch (error) {
		next(error);
	}
};
exports.getAllProjects = async (req, res, next) => {
	try {
		const user = res.user;

		const respone = await models.sequelize.transaction(async transaction => {
			const getUser = await models.User.findByPk(user.sub);

			const projects = await getUser.getProjects(
				{
					order: [
						['status', 'DESC'],
						['createdAt', 'DESC']
					]
				},
				{ transaction }
			);

			return projects;
		});

		return res.status(StatusCodes.OK).json({
			success: true,
			data: respone
		});
	} catch (error) {
		next(error);
	}
};

exports.getProject = async (req, res, next) => {
	try {
		const user = res.user;
		const { projectId } = req.params;

		await models.sequelize.transaction(async transaction => {
			const project = await models.Project.findOne(
				{
					where: { id: projectId },
					include: { model: models.User, as: 'users', attributes: ['username'] }
				},
				{ transaction }
			);

			const hasUser = await project.hasUsers(user.sub, { transaction });

			if (!hasUser) return next(createError.Forbidden('Access Denied'));

			return res.status(StatusCodes.OK).json({
				success: true,
				data: {
					project,
					hasUser
				}
			});
		});
	} catch (error) {
		next(error);
	}
};

exports.updateProject = async (req, res, next) => {
	try {
		const { projectId } = req.params;

		const { error } = projectValidation(req.body);
		if (error) return next(createError.BadRequest(error.details[0].message));

		const { name, category, description, status } = req.body;

		await models.Project.update({ name, category, description, status }, { where: { id: projectId } });

		log.info(`project[${projectId}] was updated`);
		return res.status(StatusCodes.OK).json({ success: true, message: 'The project was updated successfully.' });
	} catch (error) {
		next(error);
	}
};

exports.deleteProject = async (req, res, next) => {
	try {
		const { projectId } = req.params;

		await models.Project.destroy({ where: { id: projectId } });

		log.info(`project[${projectId}] was deleted`);
		return res.status(StatusCodes.OK).json({ success: true, message: 'The project was deleted successfully,' });
	} catch (error) {
		next(error);
	}
};
