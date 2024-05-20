const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const Luxon = require('luxon');
const errorHandler = require('./src/middlewares/errorHandler');

const {
  ROOT_PATH,
  APP_ENV,
  APP_NAME,
  PORT,
  TIME_ZONE,
} = require('./src/configs');

const routes = require('./src/routes');

const app = express();

if (!PORT) throw Error('Missing PORT');
if (!APP_NAME) throw Error('Missing APP_NAME');
if (!APP_ENV) throw Error('Missing APP_ENV');

Luxon.Settings.defaultZone = TIME_ZONE;

app.use(express.json()).use(cors()).use(helmet()).use(compression());
app.use(ROOT_PATH, routes);

app.use(errorHandler);
app.configs = {};

const server = app.listen(PORT, () => {
  if (APP_ENV === 'dev') {
    console.log(`[+] '${APP_NAME}' is Ready`);
    console.log(`[+] Current APP_ENV '${APP_ENV}'`);
    console.log(`[+] Current PORT: '${PORT}'`);
    console.log(`[+] Current TIME_ZONE: '${TIME_ZONE}'`);
  }
});

module.exports = { app, server };
