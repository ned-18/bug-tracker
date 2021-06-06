const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const log = require('./logger');
const createError = require('http-errors');

const apiV1 = require('./routes');

const app = express();

app.use(
	cors({
		origin: 'http://localhost:4200',
		methods: ['GET, POST, OPTIONS, PUT, PATCH, DELETE'],
		allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
		credentials: true
	})
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/images', express.static(path.join('uploads/images')));

app.use(logger('dev'));
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

//Routes
app.use('/api/v1', apiV1);

// 404
app.use('**', () => {
	throw createError.NotFound('Route not found or method is invalid.');
});

//Error handling
app.use((error, req, res) => {
	log.error(error);
	res.status(error.status || 500).json({
		success: false,
		status: error.status || 500,
		message: error.message
	});
});

module.exports = app;
