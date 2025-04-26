const express = require('express');
const ProductController = require('../controllers/product.controller');
const validate = require('../utils/validation');
const { productCreateSchema, productUpdateSchema, addedStockSchema, removedStockSchema } = require('../validationSchema/productSchema');
const router = express.Router();

router.post('/createProduct',validate(productCreateSchema) ,ProductController.createProduct);
router.get('/getAllProducts', ProductController.getAllProducts);
router.get('/getProduct:id', ProductController.getProductById);
router.patch('/updateProduct:id',validate(productUpdateSchema), ProductController.updateProduct);
router.delete('/deleteProduct:id', ProductController.deleteProduct);
router.patch('/addStock',validate(addedStockSchema), ProductController.addStock);
router.patch('/removeStock',validate(removedStockSchema), ProductController.removeStock);

module.exports = router;
