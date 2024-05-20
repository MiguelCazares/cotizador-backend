const knex = require('knex');
const { DATABASE_CONFIG } = require('../configs');

module.exports = knex(DATABASE_CONFIG);
