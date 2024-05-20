const db = require('../utils/db');
const {
  QUOTATION_SERVICES_COLUMNS,
} = require('./columns');

const {
  QUOTATION_SERVICES,
} = require('./tables');

const getQuotationServicesByQuotationId = async (quotationRequestId) => {
  const packages = db.select(QUOTATION_SERVICES_COLUMNS)
    .from(QUOTATION_SERVICES)
    .where('quotation_request_id', quotationRequestId);

  return packages;
};

module.exports = {
  getQuotationServicesByQuotationId,
};
