const QuotationPackagesRepository = require('../repositories/QuotationPackageRepository');
const QuotationServicesRepository = require('../repositories/QuotationServicesRepository');
const QuotationExtraFoliosRepository = require('../repositories/QuotationExtraFoliosRepository');
const QutationWebServiceRepository = require('../repositories/QuotationWebServiceRepository');
const QuotationWsPackagesRepository = require('../repositories/QuotationWsPackagesRepository');
const { createColombianFormatPrice } = require('../utils/formatPrice');
const db = require('../utils/db');
const { QUOTATION_REQUESTS_COLUMNS } = require('../repositories/columns');
const { QUOTATION_REQUESTS } = require('../repositories/tables');

const getLinkQuotationRequest = async (quotationRequestId) => {
  const quotationPackages = await QuotationPackagesRepository.getQuotationPackagesByQuotationId(quotationRequestId);
  const formattedPackages = quotationPackages.map((item) => ({
    ...item,
    price: createColombianFormatPrice(item.price),
  }));

  const quotationServices = await QuotationServicesRepository.getQuotationServicesByQuotationId(quotationRequestId);
  const formattedServices = quotationServices.map((item) => ({
    ...item,
    price: createColombianFormatPrice(item.price),
  }));

  const quotationExtraFolios = await QuotationExtraFoliosRepository.getQuotationExtraFoliosByQuotationId(quotationRequestId);
  const formattedExtraFolios = quotationExtraFolios.map((item) => ({
    ...item,
    price: createColombianFormatPrice(item.price),
  }));

  return {
    formattedPackages,
    formattedServices,
    formattedExtraFolios,
  };
};

const getWsQuotationRequest = async (quotationRequestId) => {
  const packagesWs = await QuotationWsPackagesRepository.getWsPackagesByQuotationRequestId(quotationRequestId);
  const webServiceSoftware = await QutationWebServiceRepository.getWebServiceSoftwareById(packagesWs[0].softwareId);
  const formattedPackages = packagesWs.map((item) => ({
    ...item,
    price: createColombianFormatPrice(item.price),
  }));

  return {
    webServiceSoftware,
    formattedPackages,
  };
};

const getPackageServiceIdsByQuotation = async (quotationRequestContent) => {
  let serviceIds = [];
  let extraFoliosIds = [];
  const { formattedPackages, formattedServices, formattedExtraFolios } = quotationRequestContent;

  const packageIds = formattedPackages.map((item) => item.facturatechPackageId);
  if (formattedServices !== undefined) {
    serviceIds = formattedServices.map((item) => item.facturatechServiceId);
  }
  if (formattedExtraFolios !== undefined) {
    extraFoliosIds = formattedExtraFolios.map((item) => item.facturatechPackageId);
  }
  const allPackageIds = [...packageIds, ...extraFoliosIds];

  return {
    packageIds: allPackageIds,
    serviceIds,
  };
};

const getCountQuery = async (userId, dealerClients, id, reference, status, startDate, endDate) => {
  const countQuery = db(QUOTATION_REQUESTS)
    .count('* as totalItems');

  if (userId !== 0) {
    countQuery.whereIn(QUOTATION_REQUESTS_COLUMNS.userLinkId, [userId, ...dealerClients]);
  }

  countQuery.andWhere((query) => {
    if (id) query.where(QUOTATION_REQUESTS_COLUMNS.id, id);
    if (reference) query.where(QUOTATION_REQUESTS_COLUMNS.reference, reference);
    if (status) query.where(QUOTATION_REQUESTS_COLUMNS.status, status);
    if (startDate && endDate) query.whereBetween(QUOTATION_REQUESTS_COLUMNS.createdAt, [startDate, endDate]);
  });
  const [{ totalItems }] = await countQuery;

  return totalItems;
};

const getDataQuery = async (userId, dealerClients, id, reference, status, startDate, endDate, order, limit, offset) => {
  let dataQuery = db.select(
    QUOTATION_REQUESTS_COLUMNS.id,
    QUOTATION_REQUESTS_COLUMNS.total,
    QUOTATION_REQUESTS_COLUMNS.status,
    QUOTATION_REQUESTS_COLUMNS.paymentMethod,
    QUOTATION_REQUESTS_COLUMNS.reference,
    QUOTATION_REQUESTS_COLUMNS.createdAt,
  )
    .from(QUOTATION_REQUESTS);
  if (userId !== 0) {
    dataQuery = dataQuery.whereIn(QUOTATION_REQUESTS_COLUMNS.userLinkId, [userId, ...dealerClients]);
  }
  dataQuery.andWhere((query) => {
    if (id) query.where(QUOTATION_REQUESTS_COLUMNS.id, id);
    if (reference) query.where(QUOTATION_REQUESTS_COLUMNS.reference, reference);
    if (status) query.where(QUOTATION_REQUESTS_COLUMNS.status, status);
    if (startDate && endDate) query.whereBetween(QUOTATION_REQUESTS_COLUMNS.createdAt, [startDate, endDate]);
  })
    .orderBy(QUOTATION_REQUESTS_COLUMNS.createdAt, order)
    .limit(limit)
    .offset(offset);

  const dataResult = await dataQuery;

  return dataResult;
};

module.exports = {
  getLinkQuotationRequest,
  getWsQuotationRequest,
  getPackageServiceIdsByQuotation,
  getCountQuery,
  getDataQuery,
};
