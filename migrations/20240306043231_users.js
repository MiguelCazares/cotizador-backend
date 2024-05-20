const { USERS } = require('../src/repositories/tables');

exports.up = (knex) => knex.schema.createTable(USERS, (table) => {
  table.bigIncrements('id').primary();

  table.bigInteger('facturatech_id').nullable().unique().index()
    .comment('ID from Facturatech');
  table.bigInteger('facturatech_dealer_id').nullable().comment('ID from Dealer');
  table.bigInteger('link_dealer_id').nullable().comment('ID from Link Dealer');
  table.string('username').nullable().comment('Username from Dealer');
  table.string('nit').notNullable().comment('NIT from Facturatech');
  table.string('email').notNullable().comment('Email from Dealer');
  table.string('user_type').notNullable().comment('Type of user from Dealer');
  table.string('role').notNullable().comment('Role from Dealer');
  table.string('name').notNullable().comment('Name from Dealer');
  table.string('phone').notNullable().comment('Phone from Dealer');
  table.string('status').notNullable().comment('Status from Dealer');
  table.string('device_from').notNullable().comment('Device from Dealer');
  table.boolean('is_dealer').notNullable().default(false).comment('Is Dealer');
  table.string('password').nullable().comment('Password from Dealer');
  table.string('password_reset_token').nullable().comment('Password reset token from Dealer');

  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable(USERS);
