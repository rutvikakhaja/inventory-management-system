const { body } = require("express-validator");

const productCreateSchema = [
    body("name").notEmpty().withMessage("Name is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("costPrice").isNumeric().withMessage("Cost Price must be a number"),
    body("sellingPrice").isNumeric().withMessage("Selling Price must be a number"),
    body("quantity").isNumeric().withMessage("Quantity must be a number")
];

const productUpdateSchema = [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("category").optional().notEmpty().withMessage("Category is required"),
    body("costPrice").optional().isNumeric().withMessage("Cost Price must be a number"),
    body("sellingPrice").optional().isNumeric().withMessage("Selling Price must be a number"),
    body("quantity").optional().isNumeric().withMessage("Quantity must be a number")
];

const addedStockSchema = [
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("productId").notEmpty().withMessage("Product ID is required")
];

const removedStockSchema = [
    body("quantity").notEmpty().withMessage("Quantity is required"),
    body("productId").notEmpty().withMessage("Product ID is required")
];

module.exports = {
    productCreateSchema,
    productUpdateSchema,
    addedStockSchema,
    removedStockSchema
};