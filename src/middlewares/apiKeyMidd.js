const Boom = require('@hapi/boom');
const { API_KEY } = require('../configs');

const apiKeyMidd = (req, res, next) => {
  const apiKey = req.headers['api-key'];

  if (!apiKey) {
    return next(Boom.unauthorized('Missing API Key'));
  }

  if (apiKey !== API_KEY) {
    return next(Boom.unauthorized('Invalid API Key'));
  }

  return next();
};

module.exports = apiKeyMidd;
