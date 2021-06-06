const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { isNull, last, split } = require('lodash');
const log = require('../logger');
const { userValidation } = require('../validation');
const config = require('../config');

const { User, Role } = require('../db/models');
const BEARER_CONSTANT = 'Bearer ';

exports.registerUser = async (req, res, next) => {
	try {
		const { error } = userValidation(req.body);
		if (error) return next(createError.BadRequest(error.details[0].message));

		const { username, email, password } = req.body;

		//Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const [respone, created] = await User.findOrCreate({
			where: {
				[Op.or]: [{ email }, { username }]
			},
			defaults: {
				username,
				email,
				password: hashedPassword,
				roleId: 1
			}
		});

		if (created) {
			log.info(`user[${respone.id}] was created`);
			return res.status(StatusCodes.CREATED).json({
				success: true,
				message: 'You have registered successfully. You can log in now!',
				user: respone.id
			});
		}

		if (respone.username === username) return next(createError.BadRequest('Username already exists!'));
		if (respone.email === email) return next(createError.BadRequest('Email already exists!'));
	} catch (error) {
		next(error);
	}
};

exports.loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({
			where: { username },
			include: [{ model: Role, attributes: ['id', 'name'], as: 'role' }]
		});
		if (isNull(user)) {
			return next(createError.Unauthorized('Your credentials are not valid!'));
		} else {
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const payload = {
					sub: user.id,
					username,
					role: user.role
				};
				const options = { algorithm: 'HS384', expiresIn: '5h' };
				const token = await jwt.sign(payload, config.JWT_SIGNING_KEY, options);

				return res.status(StatusCodes.OK).json({
					success: true,
					message: 'You have logged in successfully.',
					user: { id: user.id, username, token, role: user.role.name }
				});
			} else {
				return next(createError.Unauthorized('Your credentials are not valid!'));
			}
		}
	} catch (error) {
		next(error);
	}
};

//Check if is user authenticated
exports.checkAuth = async (req, res) => {
	const bearerToken = req.headers.authorization;
	const token = last(split(bearerToken, BEARER_CONSTANT));

	if (token) {
		jwt.verify(
			token,
			config.JWT_SIGNING_KEY,
			{ algorithm: 'HS384', ignoreExpiration: false },
			async (error, decodedToken) => {
				if (error) {
					return res.status(StatusCodes.OK).json({ authenticated: false, user: null });
				} else {
					return res.status(StatusCodes.OK).json({ authenticated: true, user: decodedToken });
				}
			}
		);
	} else {
		return res.status(StatusCodes.OK).json({ authenticated: false, user: null });
	}
};
