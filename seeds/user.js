const crypto = require('crypto');
const { USERS } = require('../src/repositories/tables');

const password = 'Migangsolcaz.99*';
const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex(USERS).insert([
    {
      username: 'Facturatech',
      nit: '123456789',
      email: 'miguelsoledad751@gmail.com',
      user_type: 'super_admin',
      role: 'super_admin',
      name: 'Miguel Soledad',
      phone: '123456789',
      status: 'active',
      device_from: 'seed',
      is_dealer: false,
      password: passwordHash,
    },
  ]);
};
