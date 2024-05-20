const Boom = require('@hapi/boom');

const validateSchema = async (schema, data) => {
  try {
    const dataValid = await schema.validateAsync(data);

    return dataValid;
  } catch (err) {
    const { details } = err;
    throw Boom.badRequest(details.map((i) => i.message).join(', '));
  }
};

module.exports = {
  validateSchema,
};
