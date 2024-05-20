const QuotationRequestReporitory = require('../repositories/QuotationRequestRepository');
const { notFoundErrorHandle, badRequestErrorHandle } = require('../utils/ErrorHandler');
const {
  QUOTATION_REQUESTS_TYPES,
  PAYMENT_METHODS,
  SALE_STATUS,
  QUOTATION_REQUESTS_STATUS,
} = require('../configs/constants');
const {
  getLinkQuotationRequest,
  getWsQuotationRequest,
  getPackageServiceIdsByQuotation,
} = require('../helpers/QuotationRequestHelper');
const { saveSale } = require('../repositories/SaleRepository');
const { createSalesByQuotationRequest } = require('../resource/PaginaFtResource');

const createSale = async (quotationRequestId) => {
  if (!quotationRequestId) {
    badRequestErrorHandle(new Error('Faltan campos obligatorios'));
  }

  let quotationRequestContet = {};
  const [quotationRequest] = await QuotationRequestReporitory.getQuotationRequestById(quotationRequestId);

  if (!quotationRequest) {
    notFoundErrorHandle(new Error('No se encontró la cotización'));
  }

  if (quotationRequest.status !== QUOTATION_REQUESTS_STATUS.PENDING) {
    notFoundErrorHandle(new Error('La cotización ya fue procesada'));
  }

  const { typeQuotationRequest } = quotationRequest;

  if (typeQuotationRequest === QUOTATION_REQUESTS_TYPES.LINK) {
    quotationRequestContet = await getLinkQuotationRequest(quotationRequestId);
  }

  if (typeQuotationRequest === QUOTATION_REQUESTS_TYPES.WS) {
    quotationRequestContet = await getWsQuotationRequest(quotationRequestId);
  }

  const arrayIds = await getPackageServiceIdsByQuotation(quotationRequestContet);
  const customerData = {
    id_co_usuario: quotationRequest.userFacturatechId,
    name: quotationRequest.userName,
    email: quotationRequest.userEmail,
    phone: quotationRequest.userPhone,
    payment_method: PAYMENT_METHODS.WOMPI,
    reference: quotationRequest.reference,
  };

  const response = await createSalesByQuotationRequest(customerData, arrayIds.packageIds, arrayIds.serviceIds);
  const { wompi_session: wompiSession } = response;

  const saleData = {
    user_link_id: quotationRequest.userId,
    quotation_request_id: quotationRequest.id,
    type: quotationRequest.typeQuotationRequest,
    status: SALE_STATUS.PENDING,
    total: quotationRequest.total,
    reference: quotationRequest.reference,
    payment_method: PAYMENT_METHODS.WOMPI,
  };
  await saveSale(saleData);
  await QuotationRequestReporitory.updateQuotationRequestStatus(quotationRequestId, QUOTATION_REQUESTS_STATUS.PROCESADA);

  return {
    wompiSession,
  };
};

module.exports = {
  createSale,
};
