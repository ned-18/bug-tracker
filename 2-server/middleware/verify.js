const createError = require('http-errors');
const { split, last } = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config');
const BEARER_CONSTANT = 'Bearer ';

const token = (req, res, next) => {
	try {
		const bearerToken = req.headers.authorization;
		if (!bearerToken) throw createError.Unauthorized('Access Denied');

		const token = last(split(bearerToken, BEARER_CONSTANT));

		const decoded = jwt.verify(token, config.JWT_SIGNING_KEY, {
			algorithm: 'HS384',
			ignoreExpiration: false
		});
		res.user = decoded;
		next();
	} catch (error) {
		throw createError.Unauthorized('Access Denied');
	}
};

const isProjectManager = (req, res, next) => {
	try {
		const { role } = res.user;
		if (role.name === 'PROJECT_MANAGER') {
			next();
		} else {
			throw createError.Forbidden('Access Denied');
		}
	} catch (error) {
		throw createError.Forbidden('Access Denied');
	}
};

module.exports = {
	token,
	isProjectManager
};
