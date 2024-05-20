const { DATABASE_CONFIG } = require('./src/configs');

module.exports = {
  ...DATABASE_CONFIG,
  migrations: './migrations',
  seeds: './seeds',
};
