const db = require('../utils/db');
const {
  SALES_COLUMNS,
} = require('./columns');

const {
  SALES,
} = require('./tables');

const saveSale = async (saleData) => {
  const [sale] = await db(SALES)
    .returning(SALES_COLUMNS)
    .insert(saleData);

  return sale;
};

module.exports = {
  saveSale,
};
