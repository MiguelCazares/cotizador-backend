const { SALES } = require('../src/repositories/tables');

exports.up = (knex) => knex.schema.createTable(SALES, (table) => {
  table.bigIncrements('id').primary();

  table.bigInteger('user_link_id').notNullable().comment('ID from user link');
  table.bigInteger('quotation_request_id').notNullable().unique().comment('ID from quotation request');
  table.string('type').notNullable().comment('Type from sale');
  table.string('status').notNullable().comment('Status from sale');
  table.double('total').notNullable().comment('Price from sale');
  table.string('reference').notNullable().comment('Reference from sale');
  table.string('payment_method').notNullable().comment('Payment method from sale');
  table.timestamp('transaction_date').nullable().comment('Transaction date');
  table.float('payment_percentage').nullable().comment('Payment percentage');
  table.float('payment_amount').nullable().comment('Payment amount');
  table.float('payment_total').nullable().comment('Payment total');
  table.string('commission_status').nullable().default('pending').comment('Commission status');

  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable(SALES);
