const AuthService = require('../services/AuthService');
const { loginSchema } = require('../schemas/loginSchema');
const { validateSchema } = require('../utils/joiValidate');

const login = async (req, res, next) => {
  const { user, password } = req.body;
  try {
    const userData = await validateSchema(loginSchema, { user, password });
    const response = await AuthService.login(userData);

    return res.send(response);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};
