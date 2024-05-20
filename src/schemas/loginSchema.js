const Joi = require('joi');

const loginSchema = Joi.object({
  user: Joi.string().required().messages({
    'string.empty': 'User is required',
    'any.required': 'User is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
}).options({ allowUnknown: false });

module.exports = {
  loginSchema,
};
