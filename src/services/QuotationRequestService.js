const QuotationRequestReporitory = require('../repositories/QuotationRequestRepository');
const { createColombianFormatPrice } = require('../utils/formatPrice');
const { notFoundErrorHandle } = require('../utils/ErrorHandler');
const {
  QUOTATION_REQUESTS_TYPES,
} = require('../configs/constants');
const {
  getLinkQuotationRequest,
  getWsQuotationRequest,
} = require('../helpers/QuotationRequestHelper');

const getQuotationRequestByUserId = async (userId, paginationData, filters) => {
  const quotationsRequest = await QuotationRequestReporitory.getQuotationRequestByUserId(userId, paginationData, filters);

  if (quotationsRequest.data.length === 0) {
    notFoundErrorHandle(new Error('No se encontraron cotizaciones'));
  }

  const quotationsRequestFormatted = quotationsRequest.data.map((quotation) => ({
    ...quotation,
    total: createColombianFormatPrice(quotation.total),
  }));

  return {
    pagination: quotationsRequest.pagination,
    data: quotationsRequestFormatted,
  };
};

const getQuotationRequestById = async (id) => {
  let quotationRequestContet = {};
  const [quotationRequest] = await QuotationRequestReporitory.getQuotationRequestById(id);

  if (!quotationRequest) {
    notFoundErrorHandle(new Error('No se encontró la cotización'));
  }

  const quotationRequestFormatted = {
    ...quotationRequest,
    total: createColombianFormatPrice(quotationRequest.total),
  };

  if (quotationRequest.typeQuotationRequest === QUOTATION_REQUESTS_TYPES.LINK) {
    quotationRequestContet = await getLinkQuotationRequest(quotationRequest.id);
  }

  if (quotationRequest.typeQuotationRequest === QUOTATION_REQUESTS_TYPES.WS) {
    quotationRequestContet = await getWsQuotationRequest(quotationRequest.id);
  }

  const data = {
    ...quotationRequestFormatted,
    ...quotationRequestContet,
  };

  return data;
};

const getQuotationRequests = async (paginationData, filters) => {
  const quotationsRequest = await QuotationRequestReporitory.getQuotationRequests(paginationData, filters);

  if (quotationsRequest.data.length === 0) {
    notFoundErrorHandle(new Error('No se encontraron cotizaciones'));
  }

  const quotationsRequestFormatted = quotationsRequest.data.map((quotation) => ({
    ...quotation,
    total: createColombianFormatPrice(quotation.total),
  }));

  return {
    pagination: quotationsRequest.pagination,
    data: quotationsRequestFormatted,
  };
};

module.exports = {
  getQuotationRequestByUserId,
  getQuotationRequestById,
  getQuotationRequests,
};
