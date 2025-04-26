const express = require('express');
const validate = require('../utils/validation');
const { createSalesSchema } = require('../validationSchema/salesSchema');
const SalesController = require('../controllers/sales.controller');
const router = express.Router();

router.post('/createSale', validate(createSalesSchema), SalesController.createSale);
router.get('/getAllSales', SalesController.getSales);
module.exports = router;
