const db = require('../utils/db');
const {
  QUOTATION_EXTRA_FOLIOS_COLUMNS,
} = require('./columns');

const {
  QUOTATION_EXTRA_FOLIOS,
} = require('./tables');

const getQuotationExtraFoliosByQuotationId = async (quotationRequestId) => {
  const packages = db.select(QUOTATION_EXTRA_FOLIOS_COLUMNS)
    .from(QUOTATION_EXTRA_FOLIOS)
    .where('quotation_request_id', quotationRequestId);

  return packages;
};

module.exports = {
  getQuotationExtraFoliosByQuotationId,
};
