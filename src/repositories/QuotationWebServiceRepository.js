const db = require('../utils/db');
const {
  WEB_SERVICE_SOFTWARE_COLUMNS,
} = require('./columns');

const {
  WEB_SERVICE_SOFTWARE,
} = require('./tables');

const getWebServiceSoftwareById = async (softwareId) => {
  const webService = db.select(WEB_SERVICE_SOFTWARE_COLUMNS)
    .from(WEB_SERVICE_SOFTWARE)
    .where(`${WEB_SERVICE_SOFTWARE_COLUMNS.id}`, softwareId);

  return webService;
};

module.exports = {
  getWebServiceSoftwareById,
};
