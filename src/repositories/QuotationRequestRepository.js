const db = require('../utils/db');
const {
  QUOTATION_REQUESTS_COLUMNS,
  USERS_COLUMNS,
} = require('./columns');
const {
  QUOTATION_REQUESTS,
  USERS,
} = require('./tables');
const { getDealerClients } = require('../helpers/UserHelper');
const { getCountQuery, getDataQuery } = require('../helpers/QuotationRequestHelper');

const getQuotationRequestByUserId = async (userId, pagination, filters) => {
  const { page, limit, order } = pagination;
  const {
    id, reference, status, start_date: startDate, end_date: endDate,
  } = filters;
  const offset = (page - 1) * limit;

  const dealerClients = await getDealerClients(userId);

  const [totalItems, dataResult] = await Promise.all([
    getCountQuery(userId, dealerClients, id, reference, status, startDate, endDate),
    getDataQuery(userId, dealerClients, id, reference, status, startDate, endDate, order, limit, offset),
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.ceil((offset + 1) / limit);

  return {
    pagination: {
      totalItems, totalPages, currentPage, pageSize: limit,
    },
    data: dataResult,
  };
};

const getQuotationRequestById = async (id) => {
  const quotation = await db(QUOTATION_REQUESTS)
    .innerJoin(USERS, USERS_COLUMNS.id, QUOTATION_REQUESTS_COLUMNS.userLinkId)
    .select(
      `${QUOTATION_REQUESTS_COLUMNS.id} as id`,
      `${USERS_COLUMNS.id} as userId`,
      `${USERS_COLUMNS.facturatechId} as userFacturatechId`,
      `${USERS_COLUMNS.name} as userName`,
      `${USERS_COLUMNS.email} as userEmail`,
      `${USERS_COLUMNS.phone} as userPhone`,
      `${QUOTATION_REQUESTS_COLUMNS.total} as total`,
      `${QUOTATION_REQUESTS_COLUMNS.status} as status`,
      `${QUOTATION_REQUESTS_COLUMNS.paymentMethod} as paymentMethod`,
      `${QUOTATION_REQUESTS_COLUMNS.reference} as reference`,
      `${QUOTATION_REQUESTS_COLUMNS.typeQuotationRequest} as typeQuotationRequest`,
      `${QUOTATION_REQUESTS_COLUMNS.createdAt} as createdAt`,
    )
    .where(QUOTATION_REQUESTS_COLUMNS.id, id);

  return quotation;
};

const updateQuotationRequestStatus = async (id, status) => {
  const updateQuotation = await db(QUOTATION_REQUESTS)
    .update({
      status,
    })
    .where({ id })
    .returning(QUOTATION_REQUESTS_COLUMNS);

  return updateQuotation;
};

const getQuotationRequests = async (paginationData, filters) => {
  const { page, limit, order } = paginationData;
  const {
    id, reference, status, start_date: startDate, end_date: endDate,
  } = filters;
  const offset = (page - 1) * limit;

  const [totalItems, dataResult] = await Promise.all([
    getCountQuery(0, [], id, reference, status, startDate, endDate),
    getDataQuery(0, [], id, reference, status, startDate, endDate, order, limit, offset),
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.ceil((offset + 1) / limit);

  return {
    pagination: {
      totalItems, totalPages, currentPage, pageSize: limit,
    },
    data: dataResult,
  };
};

module.exports = {
  getQuotationRequestByUserId,
  getQuotationRequestById,
  updateQuotationRequestStatus,
  getQuotationRequests,
};
