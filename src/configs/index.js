const assert = require('assert');

if (process.env.APP_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const {
  APP_ENV = 'dev',
  APP_ROOT = 'http://localhost',
  PORT = 3001,
  API_KEY = 'test',
  APP_NAME = 'ftech-cotizador-api',
  DATABASE = 'postgres://postgres:secret@localhost:5432/test',
  TOKEN_SECRET = 'secret',
  TOKEN_EXPIRES = 1,
  BASE_URL_PAGINA = 'http://localhost:3000',
  API_KEY_PAGINA = 'secret',
  TIME_ZONE = 'UTC',
} = process.env;

assert(APP_ENV, 'Missing APP_ENV');
assert(PORT, 'Missing PORT');
assert(APP_NAME, 'Missing APP_NAME');
assert(DATABASE, 'Missing DATABASE');
assert(API_KEY, 'Missing API_KEY');
assert(TOKEN_SECRET, 'Missing TOKEN_SECRET');
assert(TOKEN_EXPIRES, 'Missing TOKEN_EXPIRES');
assert(BASE_URL_PAGINA, 'Missing BASE_URL_PAGINA');
assert(API_KEY_PAGINA, 'Missing API_KEY_PAGINA');
assert(TIME_ZONE, 'Missing TIME_ZONE');

module.exports = {
  APP_ENV,
  APP_ROOT,
  PORT,
  APP_NAME,
  ROOT_PATH: `/api/${APP_NAME}`,
  API_KEY,
  DATABASE_CONFIG: {
    client: 'pg',
    connection: DATABASE,
    pool: { min: 0, max: 10 },
    acquireConnectionTimeout: 2000,
  },
  TOKEN_SECRET,
  TOKEN_EXPIRES,
  BASE_URL_PAGINA,
  API_KEY_PAGINA,
  TIME_ZONE,
};
