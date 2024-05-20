const { QUOTATION_W_S_PACKAGES } = require('../src/repositories/tables');

exports.up = (knex) => knex.schema.createTable(QUOTATION_W_S_PACKAGES, (table) => {
  table.bigIncrements('id').primary();

  table.bigInteger('software_id').notNullable().comment('ID from software');
  table.bigInteger('quotation_request_id').notNullable().comment('ID from quotation request');
  table.bigInteger('facturatech_package_id').notNullable().comment('ID from facturatech package');
  table.double('price').notNullable().comment('Price from facturatech package');
  table.double('quantity').notNullable().comment('Quantity from facturatech package');
  table.string('package_name').notNullable().comment('Package name from facturatech package');

  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable(QUOTATION_W_S_PACKAGES);
