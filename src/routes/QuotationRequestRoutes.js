const router = require('express').Router();
const { PERMISSIONS } = require('../configs/modulesAndPermissions');
const { authorize } = require('../middlewares/jwtValidate');

const QuotationRequestController = require('../controllers/QuotationRequestController');

router.get('/get-quotations', [authorize(PERMISSIONS.SHOW_ALL_QUOTATIONS)], QuotationRequestController.getQuotationRequests);
router.get('/get-quotations/by-user-id', QuotationRequestController.getQuotationRequestByUserId);
router.get('/get-quotation/by-id/:id(\\d+)', QuotationRequestController.getQuotationRequestById);

module.exports = router;
