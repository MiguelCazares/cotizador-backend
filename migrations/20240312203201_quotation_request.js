const { QUOTATION_REQUESTS } = require('../src/repositories/tables');

exports.up = (knex) => knex.schema.createTable(QUOTATION_REQUESTS, (table) => {
  table.bigIncrements('id').primary();

  table.bigInteger('user_link_id').notNullable().comment('ID from user link');
  table.double('total').notNullable().comment('Total from quotation request');
  table.string('status').notNullable().comment('Status from quotation request');
  table.string('payment_method').nullable().comment('Payment method from quotation request');
  table.string('reference').nullable().comment('Reference from quotation request');
  table.timestamp('last_date_update').nullable().comment('Last date update from quotation request');
  table.bigInteger('authorizes_id').nullable().comment('ID from authorizes');
  table.string('type_quotation_request').nullable().comment('Type quotation request from quotation request');

  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable(QUOTATION_REQUESTS);
