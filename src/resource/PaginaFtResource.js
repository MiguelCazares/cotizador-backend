const { default: axios } = require('axios');
const { BASE_URL_PAGINA, API_KEY_PAGINA } = require('../configs');
const { laravelHandleError } = require('../utils/decodeErrorLaravel');

const PAGINA_BASE_URL = `${BASE_URL_PAGINA}/api/v1/respagina`;
const headers = {
  'Content-Type': 'application/json',
  'api-key': API_KEY_PAGINA,
};

const getCoUsuarioByUserAndPassword = async (user, password) => {
  try {
    const params = {
      usuario: user,
      password,
    };

    const { data: { data } } = await axios.get(`${PAGINA_BASE_URL}/get-co-usuario`, {
      headers,
      params,
    });

    return data;
  } catch (err) {
    return laravelHandleError(err);
  }
};

const createSalesByQuotationRequest = async (customerData, packageIds, serviceIds) => {
  try {
    const params = {
      customer_data: customerData,
      package_ids: packageIds,
      service_ids: serviceIds,
    };

    const response = await axios.post(`${PAGINA_BASE_URL}/save/products/by-quotation`, params, {
      headers,
    });

    const { data } = response;

    return data;
  } catch (err) {
    return laravelHandleError(err);
  }
};

module.exports = {
  getCoUsuarioByUserAndPassword,
  createSalesByQuotationRequest,
};
