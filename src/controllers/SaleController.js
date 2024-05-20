const SaleService = require('../services/SaleService');

const createSale = async (req, res, next) => {
  const { id: quotationRequestId } = req.body;
  try {
    const response = await SaleService.createSale(quotationRequestId);

    return res.status(201).json(response);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createSale,
};
