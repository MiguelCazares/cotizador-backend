const Boom = require('@hapi/boom');

const laravelHandleError = (error) => {
  try {
    if (error.response && error.response.data && error.response.data.message) {
      const { message } = error.response.data;
      const { status } = error.response;

      throw Boom.boomify(new Error(message), { statusCode: status });
    } else {
      throw Boom.boomify(error);
    }
  } catch (err) {
    throw Boom.boomify(err);
  }
};

module.exports = {
  laravelHandleError,
};
