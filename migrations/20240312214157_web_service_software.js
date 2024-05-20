const { WEB_SERVICE_SOFTWARE } = require('../src/repositories/tables');

exports.up = (knex) => knex.schema.createTable(WEB_SERVICE_SOFTWARE, (table) => {
  table.bigIncrements('id').primary();

  table.string('name').notNullable().unique().comment('Name of the software');
  table.string('description').notNullable().comment('Description of the software');
  table.string('status').notNullable().comment('Status of the software');

  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable(WEB_SERVICE_SOFTWARE);
