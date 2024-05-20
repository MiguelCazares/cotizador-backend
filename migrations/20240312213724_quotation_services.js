const { QUOTATION_SERVICES } = require('../src/repositories/tables');

exports.up = (knex) => knex.schema.createTable(QUOTATION_SERVICES, (table) => {
  table.bigIncrements('id').primary();

  table.bigInteger('quotation_request_id').notNullable().comment('ID from quotation request');
  table.bigInteger('facturatech_service_id').notNullable().comment('ID from facturatech service');
  table.double('price').notNullable().comment('Price from facturatech service');
  table.double('quantity').notNullable().comment('Quantity from facturatech service');
  table.string('service_name').notNullable().comment('Service name from facturatech service');

  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable(QUOTATION_SERVICES);
