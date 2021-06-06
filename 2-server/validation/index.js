const Joi = require('joi');

const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

// User validation
const userValidation = data => {
	const schema = Joi.object({
		firstName: Joi.string().allow(null, '').max(30),
		lastName: Joi.string().allow(null, '').max(30),
		username: Joi.string().min(4).max(30).required(),
		email: Joi.string().email().required(),
		password: Joi.string()
			.pattern(new RegExp(passwordRe))
			.error(errors => {
				errors.forEach(err => {
					if (err.code) {
						err.message =
							'Password must have at least 8 characters. One uppercase letter, numeric character and special character.';
					}
				});
				return errors;
			}),

		confirmPassword: Joi.ref('password')
	});

	return schema.validate(data);
};

const projectValidation = data => {
	const schema = Joi.object({
		name: Joi.string().min(4).max(30).required(),
		category: Joi.string().required(),
		description: Joi.string().min(10).required(),
		status: Joi.string().allow(null, '')
	});

	return schema.validate(data);
};

const bugValidation = data => {
	const schema = Joi.object({
		name: Joi.string().min(4).max(30).required(),
		assignTo: Joi.array().items(Joi.string()).required(),
		priority: Joi.string().required(),
		description: Joi.string().min(10).required(),
		status: Joi.string().allow(null, '')
	});

	return schema.validate(data);
};

const emailValidation = data => {
	const schema = Joi.object({
		emailFrom: Joi.string().email().required(),
		emailTo: Joi.string().email().required()
	});

	return schema.validate(data);
};

module.exports = {
	userValidation,
	projectValidation,
	bugValidation,
	emailValidation
};
