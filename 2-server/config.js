'use strict';

const DATABASE_USER = process.env.DATABASE_USER || 'postgres';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_PORT = process.env.DATABASE_PORT || '5432';
const DATABASE_NAME = process.env.DATABASE_NAME || 'bug-tracker';

module.exports = {
	DATABASE_URL: `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
	DATABASE_POOL_MAX_SIZE: parseInt(process.env.DATABASE_POOL_MAX_SIZE) || 5,
	DATABASE_POOL_MIN_SIZE: parseInt(process.env.DATABASE_POOL_MIN_SIZE) || 1,

	PORT: process.env.PORT || 3000,

	NODE_ENV: process.env.NODE_ENV || 'dev',

	JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY || 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdlatRjRjogo3WojgGHF',

	EMAIL_USERNAME: process.env.EMAIL_USERNAME || 'email',
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'password'
};
