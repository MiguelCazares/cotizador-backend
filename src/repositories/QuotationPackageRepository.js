const db = require('../utils/db');
const {
  QUOTATION_PACKAGES_COLUMNS,
} = require('./columns');

const {
  QUOTATION_PACKAGES,
} = require('./tables');

const getQuotationPackagesByQuotationId = async (quotationRequestId) => {
  const packages = db.select(QUOTATION_PACKAGES_COLUMNS)
    .from(QUOTATION_PACKAGES)
    .where('quotation_request_id', quotationRequestId);

  return packages;
};

module.exports = {
  getQuotationPackagesByQuotationId,
};
