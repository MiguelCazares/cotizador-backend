const db = require('../utils/db');
const {
  QUOTATION_W_S_PACKAGES_COLUMNS,
} = require('./columns');

const {
  QUOTATION_W_S_PACKAGES,
} = require('./tables');

const getWsPackagesByQuotationRequestId = (quotationRequestId) => {
  const packages = db.select(QUOTATION_W_S_PACKAGES_COLUMNS)
    .from(QUOTATION_W_S_PACKAGES)
    .where(`${QUOTATION_W_S_PACKAGES_COLUMNS.quotationRequestId}`, quotationRequestId);

  return packages;
};

module.exports = {
  getWsPackagesByQuotationRequestId,
};
