const db = require('../utils/db');

const { USERS_COLUMNS } = require('./columns');
const { USERS } = require('./tables');

const getUserByUsername = async (username) => {
  const query = db.select(USERS_COLUMNS)
    .from(USERS)
    .where('username', username);

  return query;
};

const getUserByUsernameAndPassword = async (username, password) => {
  const query = db.select(USERS_COLUMNS)
    .from(USERS)
    .where('username', username)
    .andWhere('password', password);

  return query;
};

const createUser = async (user) => {
  const query = db.insert(user)
    .into(USERS);

  return query;
};

const updateUserByUserAndPassword = async (user) => {
  const query = db(USERS)
    .where('username', user.usuario)
    .update({
      password: user.password,
    });

  return query;
};

module.exports = {
  getUserByUsername,
  createUser,
  getUserByUsernameAndPassword,
  updateUserByUserAndPassword,
};
