const QuotationRequestService = require('../services/QuotationRequestService');

const getQuotationRequestByUserId = async (req, res, next) => {
  try {
    const {
      page = 1, limit = 10, order = 'desc', id, reference, status, start_date: startDate, end_date: endDate,
    } = req.query;
    const { id: userId } = req.user;
    const pagination = { page: parseInt(page, 10), limit: parseInt(limit, 10), order };
    const filters = {
      id: parseInt(id, 10) || undefined, reference, status, start_date: startDate, end_date: endDate,
    };

    const response = await QuotationRequestService.getQuotationRequestByUserId(userId, pagination, filters);

    return res.send(response);
  } catch (err) {
    return next(err);
  }
};

const getQuotationRequestById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await QuotationRequestService.getQuotationRequestById(id);

    return res.send(response);
  } catch (err) {
    return next(err);
  }
};

const getQuotationRequests = async (req, res, next) => {
  try {
    const {
      page = 1, limit = 10, order = 'desc', id, reference, status, start_date: startDate, end_date: endDate,
    } = req.query;
    const pagination = { page: parseInt(page, 10), limit: parseInt(limit, 10), order };
    const filters = {
      id: parseInt(id, 10) || undefined, reference, status, start_date: startDate, end_date: endDate,
    };
    const response = await QuotationRequestService.getQuotationRequests(pagination, filters);

    return res.send(response);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getQuotationRequestByUserId,
  getQuotationRequestById,
  getQuotationRequests,
};
