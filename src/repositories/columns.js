const {
  USERS,
  SALES,
  QUOTATION_REQUESTS,
  QUOTATION_PACKAGES,
  QUOTATION_SERVICES,
  QUOTATION_EXTRA_FOLIOS,
  WEB_SERVICE_SOFTWARE,
  QUOTATION_W_S_PACKAGES,
} = require('./tables');

const USERS_COLUMNS = {
  id: `${USERS}.id`,
  facturatechId: `${USERS}.facturatech_id`,
  facturatechDealerId: `${USERS}.facturatech_dealer_id`,
  linkDealerId: `${USERS}.link_dealer_id`,
  username: `${USERS}.username`,
  nit: `${USERS}.nit`,
  email: `${USERS}.email`,
  userType: `${USERS}.user_type`,
  role: `${USERS}.role`,
  name: `${USERS}.name`,
  phone: `${USERS}.phone`,
  status: `${USERS}.status`,
  deviceFrom: `${USERS}.device_from`,
  isDealer: `${USERS}.is_dealer`,
  // password: `${USERS}.password`,
  // passwordResetToken: `${USERS}.password_reset_token`,
  createdAt: `${USERS}.created_at`,
  updatedAt: `${USERS}.updated_at`,
};

const QUOTATION_REQUESTS_COLUMNS = {
  id: `${QUOTATION_REQUESTS}.id`,
  userLinkId: `${QUOTATION_REQUESTS}.user_link_id`,
  total: `${QUOTATION_REQUESTS}.total`,
  status: `${QUOTATION_REQUESTS}.status`,
  paymentMethod: `${QUOTATION_REQUESTS}.payment_method`,
  reference: `${QUOTATION_REQUESTS}.reference`,
  lastDateUpdate: `${QUOTATION_REQUESTS}.last_date_update`,
  authorizesId: `${QUOTATION_REQUESTS}.authorizes_id`,
  typeQuotationRequest: `${QUOTATION_REQUESTS}.type_quotation_request`,
  createdAt: `${QUOTATION_REQUESTS}.created_at`,
  updatedAt: `${QUOTATION_REQUESTS}.updated_at`,
};

const QUOTATION_PACKAGES_COLUMNS = {
  id: `${QUOTATION_PACKAGES}.id`,
  quotationRequestId: `${QUOTATION_PACKAGES}.quotation_request_id`,
  facturatechPackageId: `${QUOTATION_PACKAGES}.facturatech_package_id`,
  price: `${QUOTATION_PACKAGES}.price`,
  quantity: `${QUOTATION_PACKAGES}.quantity`,
  packageName: `${QUOTATION_PACKAGES}.package_name`,
  createdAt: `${QUOTATION_PACKAGES}.created_at`,
  updatedAt: `${QUOTATION_PACKAGES}.updated_at`,
};

const QUOTATION_SERVICES_COLUMNS = {
  id: `${QUOTATION_SERVICES}.id`,
  quotationRequestId: `${QUOTATION_SERVICES}.quotation_request_id`,
  facturatechServiceId: `${QUOTATION_SERVICES}.facturatech_service_id`,
  price: `${QUOTATION_SERVICES}.price`,
  quantity: `${QUOTATION_SERVICES}.quantity`,
  serviceName: `${QUOTATION_SERVICES}.service_name`,
  createdAt: `${QUOTATION_SERVICES}.created_at`,
  updatedAt: `${QUOTATION_SERVICES}.updated_at`,
};

const QUOTATION_EXTRA_FOLIOS_COLUMNS = {
  id: `${QUOTATION_EXTRA_FOLIOS}.id`,
  quotationRequestId: `${QUOTATION_EXTRA_FOLIOS}.quotation_request_id`,
  facturatechPackageId: `${QUOTATION_EXTRA_FOLIOS}.facturatech_package_id`,
  price: `${QUOTATION_EXTRA_FOLIOS}.price`,
  quantity: `${QUOTATION_EXTRA_FOLIOS}.quantity`,
  packageName: `${QUOTATION_EXTRA_FOLIOS}.package_name`,
  createdAt: `${QUOTATION_EXTRA_FOLIOS}.created_at`,
  updatedAt: `${QUOTATION_EXTRA_FOLIOS}.updated_at`,
};

const WEB_SERVICE_SOFTWARE_COLUMNS = {
  id: `${WEB_SERVICE_SOFTWARE}.id`,
  name: `${WEB_SERVICE_SOFTWARE}.name`,
  description: `${WEB_SERVICE_SOFTWARE}.description`,
  status: `${WEB_SERVICE_SOFTWARE}.status`,
  createdAt: `${WEB_SERVICE_SOFTWARE}.created_at`,
  updatedAt: `${WEB_SERVICE_SOFTWARE}.updated_at`,
};

const QUOTATION_W_S_PACKAGES_COLUMNS = {
  id: `${QUOTATION_W_S_PACKAGES}.id`,
  softwareId: `${QUOTATION_W_S_PACKAGES}.software_id`,
  quotationRequestId: `${QUOTATION_W_S_PACKAGES}.quotation_request_id`,
  facturatechPackageId: `${QUOTATION_W_S_PACKAGES}.facturatech_package_id`,
  price: `${QUOTATION_W_S_PACKAGES}.price`,
  quantity: `${QUOTATION_W_S_PACKAGES}.quantity`,
  packageName: `${QUOTATION_W_S_PACKAGES}.package_name`,
  createdAt: `${QUOTATION_W_S_PACKAGES}.created_at`,
  updatedAt: `${QUOTATION_W_S_PACKAGES}.updated_at`,
};

const SALES_COLUMNS = {
  id: `${SALES}.id`,
  userLinkId: `${SALES}.user_link_id`,
  quotationRequestId: `${SALES}.quotation_request_id`,
  type: `${SALES}.type`,
  status: `${SALES}.status`,
  total: `${SALES}.total`,
  reference: `${SALES}.reference`,
  paymentMethod: `${SALES}.payment_method`,
  transactionDate: `${SALES}.transaction_date`,
  paymentPercentage: `${SALES}.payment_percentage`,
  paymentAmount: `${SALES}.payment_amount`,
  paymentTotal: `${SALES}.payment_total`,
  commissionStatus: `${SALES}.commission_status`,
  createdAt: `${SALES}.created_at`,
  updatedAt: `${SALES}.updated_at`,
};

module.exports = {
  USERS_COLUMNS,
  QUOTATION_REQUESTS_COLUMNS,
  QUOTATION_PACKAGES_COLUMNS,
  QUOTATION_SERVICES_COLUMNS,
  QUOTATION_EXTRA_FOLIOS_COLUMNS,
  WEB_SERVICE_SOFTWARE_COLUMNS,
  QUOTATION_W_S_PACKAGES_COLUMNS,
  SALES_COLUMNS,
};
