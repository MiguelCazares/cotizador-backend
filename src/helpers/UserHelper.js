const crypto = require('crypto');
const db = require('../utils/db');
const UserRepository = require('../repositories/UserRepository');
const { ROLES } = require('../configs/modulesAndPermissions');
const { USER_STATUS, DEVICE_FROM, FACTURATECH_TYPE_USER } = require('../configs/constants');
const { USERS_COLUMNS } = require('../repositories/columns');
const { USERS } = require('../repositories/tables');

const setRole = async (typeUser) => {
  const roleMap = {
    [FACTURATECH_TYPE_USER.CLIENTE_FACTURA]: ROLES.CUSTOMER,
    [FACTURATECH_TYPE_USER.DISTRIBUIDOR_NORMAL]: ROLES.DISTRIBUIDOR,
    [FACTURATECH_TYPE_USER.DISTRIBUIDOR_MASTER]: ROLES.DISTRIBUIDOR,
    [FACTURATECH_TYPE_USER.ADMINISTRADOR]: ROLES.ADMIN,
  };

  return roleMap[typeUser] || ROLES.CUSTOMER;
};

const validateIsDealer = async (typeUser) => {
  const dealerMap = {
    [FACTURATECH_TYPE_USER.CLIENTE_FACTURA]: false,
    [FACTURATECH_TYPE_USER.DISTRIBUIDOR_NORMAL]: true,
    [FACTURATECH_TYPE_USER.DISTRIBUIDOR_MASTER]: true,
    [FACTURATECH_TYPE_USER.ADMINISTRADOR]: false,
  };

  return dealerMap[typeUser] || false;
};

const migrateUserByUserAndPassword = async (body) => {
  const typeRole = await setRole(body.tipo_usuario);
  const isDealer = await validateIsDealer(body.tipo_usuario);
  const passwordHash = crypto.createHash('sha256').update(body.password).digest('hex');

  const newUser = {
    facturatech_id: body.id_usuario,
    facturatech_dealer_id: body.id_distribuidor,
    link_dealer_id: null,
    nit: body.co_datos_empresa.nit,
    email: body.email,
    username: body.usuario,
    user_type: body.tipo_usuario,
    role: typeRole,
    name: body.nombre_completo,
    phone: body.telefono,
    status: USER_STATUS.ACTIVE,
    device_from: DEVICE_FROM.COTIZADOR_API,
    is_dealer: isDealer,
    password: passwordHash,
  };
  const response = await UserRepository.createUser(newUser);

  return response;
};

const getDealerClients = async (userId) => {
  const dealerClients = await db(USERS)
    .select(USERS_COLUMNS.id)
    .where(USERS_COLUMNS.linkDealerId, userId)
    .andWhere(USERS_COLUMNS.isDealer, false);

  return dealerClients.map((client) => client.id);
};

module.exports = {
  migrateUserByUserAndPassword,
  setRole,
  getDealerClients,
};
