const { verifyToken } = require('../utils/jwtConfig');
const { validatePermissions } = require('../utils/validatePermissions');
const { notAuthorizedErrorHandle } = require('../utils/ErrorHandler');

const validateToken = async (req, res, next) => {
  const authorizedHeader = req.headers.authorization;

  if (!authorizedHeader) {
    return notAuthorizedErrorHandle(new Error('Acceso no autorizado'));
  }

  try {
    const decodedToken = await verifyToken(authorizedHeader);
    req.user = decodedToken;

    return next();
  } catch (error) {
    return notAuthorizedErrorHandle(new Error(error.message));
  }
};

const authorize = (moduleName) => async (req, res, next) => {
  try {
    const { role } = req.user;
    validatePermissions(moduleName, role);

    return next();
  } catch (err) {
    return notAuthorizedErrorHandle(new Error(err.message));
  }
};

module.exports = {
  validateToken,
  authorize,
};
