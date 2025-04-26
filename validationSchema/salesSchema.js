const { body } = require("express-validator");

const createSalesSchema = [
    body("productId").isNumeric().notEmpty().withMessage("Product ID is required"),
    body("quantity").isNumeric().notEmpty().withMessage("Quantity is required"),
    body("date").notEmpty().withMessage("Date is required"),
];

module.exports = {
    createSalesSchema,
};