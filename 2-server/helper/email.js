const nodemailer = require('nodemailer');
const config = require('../config');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.EMAIL_USERNAME,
		pass: config.EMAIL_PASSWORD
	},
	tls: { rejectUnauthorized: false }
});

const ROOT_URL = 'http://localhost:4200';

const emailOptions = (emailFrom, emailTo, output) => {
	const options = {
		from: emailFrom,
		to: emailTo,
		subject: 'Bug Tracker - join us',
		html: output
	};

	return options;
};

exports.addNewUser = async options => {
	const output = `
		<h2>Hello, join us</h2>
		<p>By clicking on the following link, you can login to <a href=${ROOT_URL}>Bug Tracker</a></p>

		<h3>Below are your username and password</h3>
		<p>Username: <strong>${options.username}</strong></p>
		<p>Password: <strong>${options.password}</strong></p>

		<strong>Please change your password after login.</strong>
	`;

	await transporter.sendMail(emailOptions(options.emailFrom, options.emailTo, output));
};

exports.addExistingUser = async options => {
	const output = `
		<h2>Hello, join us</h2>
		<p>You are invited to a new project</p>
		<a href=${ROOT_URL}>Accept the invitation</a>
	`;

	await transporter.sendMail(emailOptions(options.emailFrom, options.emailTo, output));
};
