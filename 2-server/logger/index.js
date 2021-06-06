const buildDevLogger = require('./devLogger');
const config = require('../config');

let log = null;
if (config.NODE_ENV === 'dev') {
	log = buildDevLogger();
}

module.exports = log;

// else {
// 	log = buildProdLogger();
// }
