const router = require('express').Router();
require('express-async-errors');

const AuthRoutes = require('./routes/AuthRoutes');
const QuotationRequestRoutes = require('./routes/QuotationRequestRoutes');
const SaleRoutes = require('./routes/SaleRoutes');
const { PERMISSIONS } = require('./configs/modulesAndPermissions');

const apiKeyMidd = require('./middlewares/apiKeyMidd');
const { validateToken, authorize } = require('./middlewares/jwtValidate');

router.use('/auth', [apiKeyMidd], AuthRoutes);
router.use('/quotations', [apiKeyMidd, validateToken, authorize(PERMISSIONS.SHOW_QUOTATIONS)], QuotationRequestRoutes);
router.use('/sales', [apiKeyMidd, validateToken, authorize(PERMISSIONS.CHANGE_STATUS_QUOTATIONS)], SaleRoutes);

router.get('/health-check', (req, res) => {
  res.send('OK');
});

module.exports = router;
