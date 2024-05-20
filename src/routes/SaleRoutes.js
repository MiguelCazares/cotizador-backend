const router = require('express').Router();

const SaleController = require('../controllers/SaleController');

router.post('/create-sale', SaleController.createSale);

module.exports = router;
