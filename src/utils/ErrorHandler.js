const Boom = require('@hapi/boom');

const notFoundErrorHandle = (error) => {
  throw Boom.boomify(new Error(error.message), { statusCode: 404 });
};

const badRequestErrorHandle = (error) => {
  throw Boom.boomify(new Error(error.message), { statusCode: 400 });
};

const notAuthorizedErrorHandle = (error) => {
  throw Boom.boomify(new Error(error.message), { statusCode: 401 });
};

module.exports = {
  notFoundErrorHandle,
  badRequestErrorHandle,
  notAuthorizedErrorHandle,
};
