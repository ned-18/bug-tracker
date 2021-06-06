const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const log = require('../logger');
const { bugValidation } = require('../validation');
const models = require('../db/models');

exports.createBug = async (req, res, next) => {
	try {
		const { error } = bugValidation(req.body);
		if (error) return next(createError.BadRequest(error.details[0].message));

		const { name, description, assignTo, priority } = req.body;
		const projectId = +req.query.project;

		const users = await models.User.findAll({
			where: {
				username: { [Op.in]: assignTo }
			}
		});

		const usersId = [];
		users.forEach(user => usersId.push(user.id));

		const respone = await models.sequelize.transaction(async transaction => {
			const project = await models.Project.findByPk(projectId, { transaction });
			if (project.status === 'done') return next(createError.BadRequest('Project has done!'));

			const newBug = await project.createBug(
				{
					name,
					description,
					assignTo,
					priority,
					projectId,
					status: 'inprogress'
				},
				{
					transaction
				}
			);

			await newBug.setUsers(usersId, {
				transaction
			});

			log.info(`bug[${bugId}] was created`);
			return {
				success: true,
				message: 'The bug was successfully created.',
				bugId: newBug.id,
				userId: res.user.sub
			};
		});
		return res.status(StatusCodes.CREATED).json(respone);
	} catch (error) {
		next(error);
	}
};

exports.getAllBugs = async (req, res, next) => {
	try {
		const projectId = +req.query.project;

		const bugs = await models.Bug.findAll({
			where: { projectId },
			order: [
				['status', 'DESC'],
				['priority', 'ASC'],
				['createdAt', 'DESC']
			],
			include: [
				{
					model: models.User,
					as: 'users',
					attributes: ['username']
				}
			]
		});

		if (!bugs) return next(createError.NotFound('Bugs not found!'));

		return res.status(StatusCodes.OK).json({
			success: true,
			data: bugs
		});
	} catch (error) {
		next(error);
	}
};

exports.getBug = async (req, res, next) => {
	try {
		const { bugId } = req.params;
		const projectId = +req.query.project;

		const bug = await models.Bug.findOne({
			where: { [Op.and]: [{ id: bugId }, { projectId }] },
			include: { model: models.User, as: 'users', attributes: ['username'] }
		});

		if (!bug) return next(createError.NotFound('Bug not found!'));

		return res.status(StatusCodes.OK).json({
			success: true,
			data: bug
		});
	} catch (error) {
		next(error);
	}
};

exports.updateBug = async (req, res, next) => {
	try {
		const id = res.user.sub;
		const role = res.user.role;
		const { bugId } = req.params;

		const { error } = bugValidation(req.body);
		if (error) return next(createError.BadRequest(error.details[0].message));

		const { name, description, assignTo, priority, status } = req.body;

		await models.sequelize.transaction(async transaction => {
			const bug = await models.Bug.findByPk(bugId, { transaction });

			const hasUser = await bug.hasUser(id, { transaction });

			if (hasUser || role.name !== 'BASIC') {
				await models.Bug.update({ name, description, assignTo, priority, status }, { where: { id: bugId } });

				log.info(`bug[${bugId}] was updated`);
				return res.status(StatusCodes.OK).json({ success: true, message: 'The bug was updated successfully,' });
			} else {
				return next(createError.Forbidden('Access Denied'));
			}
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteBug = async (req, res, next) => {
	try {
		const id = res.user.sub;
		const role = res.user.role;

		const { bugId } = req.params;

		await models.sequelize.transaction(async transaction => {
			const bug = await models.Bug.findByPk(bugId, { transaction });

			const hasUser = await bug.hasUser(id, { transaction });

			if (hasUser || role.name !== 'BASIC') {
				await models.Bug.destroy({ where: { id: bugId } });

				log.info(`bug[${bugId}] was deleted`);
				return res.status(StatusCodes.OK).json({ success: true, message: 'The bug was deleted successfully,' });
			} else {
				return next(createError.Forbidden('Access Denied'));
			}
		});
	} catch (error) {
		next(error);
	}
};
