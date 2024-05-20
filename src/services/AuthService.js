const crypto = require('crypto');
const { generateToken } = require('../utils/jwtConfig');
const PaginaFtResource = require('../resource/PaginaFtResource');
const UserRepository = require('../repositories/UserRepository');
const { migrateUserByUserAndPassword } = require('../helpers/UserHelper');
const { ROLES_PERMISSIONS } = require('../configs/modulesAndPermissions');

const login = async (userData) => {
  const { user, password } = userData;
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

  const userExists = await UserRepository.getUserByUsernameAndPassword(user, passwordHash);
  if (userExists.length === 0) {
    const coUser = await PaginaFtResource.getCoUsuarioByUserAndPassword(user, password);
    const getUser = await UserRepository.getUserByUsername(coUser.usuario);
    const newUser = {
      ...coUser,
      password,
    };
    if (getUser.length > 0) {
      await UserRepository.updateUserByUserAndPassword(newUser);
    } else {
      await migrateUserByUserAndPassword(newUser);
    }
  }

  const [quoteUser] = await UserRepository.getUserByUsername(user);
  const permissions = ROLES_PERMISSIONS[quoteUser.role];
  const customerData = {
    id: quoteUser.id,
    username: quoteUser.name,
    role: quoteUser.role,
  };

  const { token, expiresIn } = await generateToken(customerData);
  const userResponse = {
    user: quoteUser,
    permissions,
    token,
    expiresIn,
  };

  return userResponse;
};

module.exports = {
  login,
};
