const { WEB_SERVICE_SOFTWARE } = require('../src/repositories/tables');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex(WEB_SERVICE_SOFTWARE).del();
  await knex(WEB_SERVICE_SOFTWARE).insert([
    {
      id: 1, name: 'Facturatech', description: 'Facturatech', status: 'activo',
    },
    {
      id: 2, name: 'Dreamsoft', description: 'Dreamsoft', status: 'activo',
    },
  ]);
};
