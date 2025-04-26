const { Op } = require("sequelize");
const { Products } = require("../models");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../utils/data.helper");

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, category, costPrice, sellingPrice, quantity } = req.body;
      const product = await Products.create({
        name,
        category,
        costPrice,
        sellingPrice,
        quantity,
      });
      return generateSuccessResponse(
        res,
        "Product created successfully",
        201,
        product
      );
    } catch (error) {
      return generateErrorResponse(
        res,
        error.message || "Internal server error",
        error.status || 500,
        error
      );
    }
  }
  async getAllProducts(req, res) {
    try {
      const { page = 1, limit = 10, nameSearch, categorySearch } = req.query;
      const offset = (page - 1) * limit;
      let whereObj = {};
      if (nameSearch) {
        whereObj.name = {
          [Op.like]: `%${nameSearch}%`,
        };
      }
      if (categorySearch) {
        whereObj.category = {
          [Op.like]: `%${categorySearch}%`,
        };
      }

      const products = await Products.findAndCountAll({
        where: whereObj,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      return generateSuccessResponse(
        res,
        "Products retrieved successfully",
        200,
        products
      );
    } catch (error) {
      return generateErrorResponse(
        res,
        error.message || "Internal server error",
        error.status || 500,
        error
      );
    }
  }
  async getProductById(req, res) {
    try {
      let { id } = req.params;
      if (!id) {
        return generateErrorResponse(res, "Product ID is required", 400, {});
      }
      id = parseInt(id);
      const product = await Products.findByPk(id);
      if (!product) {
        return generateErrorResponse(res, "Product not found", 404, {});
      }
      return generateSuccessResponse(
        res,
        "Product retrieved successfully",
        200,
        product
      );
    } catch (error) {
      return generateErrorResponse(
        res,
        error.message || "Internal server error",
        error.status || 500,
        error
      );
    }
  }
  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return generateErrorResponse(res, "Product ID is required", 400, {});
      }
      const { name, category, costPrice, sellingPrice, quantity } = req.body;
      const product = await Products.findByPk(id);
      if (!product) {
        return generateErrorResponse(res, "Product not found", 404, {});
      }
      if (name) product.name = name;
      if (category) product.category = category;
      if (costPrice) product.costPrice = costPrice;
      if (sellingPrice) product.sellingPrice = sellingPrice;
      if (quantity) product.quantity = quantity;
      const updatedProduct = await product.save();

      return generateSuccessResponse(
        res,
        "Product updated successfully",
        200,
        updatedProduct
      );
    } catch (error) {
      return generateErrorResponse(
        res,
        error.message || "Internal server error",
        error.status || 500,
        error
      );
    }
  }
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return generateErrorResponse(res, "Product ID is required", 400, {});
      }
      const product = await Products.findByPk(id);
      if (!product) {
        return generateErrorResponse(res, "Product not found", 404, {});
      }
      await product.destroy();
      return generateSuccessResponse(res, "Product deleted successfully", 200, {
        id: +id,
      });
    } catch (error) {
      return generateErrorResponse(
        res,
        error.message || "Internal server error",
        error.status || 500,
        error
      );
    }
  }

  async addStock(req, res) {
    try {
      let { quantity, productId } = req.body;
      quantity = parseInt(quantity);
      if (quantity < 0) {
        return generateErrorResponse(
          res,
          "Quantity must be greater than 0",
          400,
          {}
        );
      }
      const product = await Products.findByPk(productId);
      if (!product) {
        return generateErrorResponse(res, "Product not found", 404, {});
      }

      product.quantity = product.quantity + quantity;
      const updatedStock = await product.save();
      return generateSuccessResponse(
        res,
        "Stock added successfully",
        200,
        updatedStock
      );
    } catch (err) {
      return generateErrorResponse(
        res,
        err.message || "Internal server error",
        err.status || 500,
        err
      );
    }
  }

  async removeStock(req, res) {
    try {
      let { quantity, productId } = req.body;
      quantity = parseInt(quantity);
      if (quantity < 0) {
        return generateErrorResponse(
          res,
          "Quantity must be greater than 0",
          400,
          {}
        );
      }
      const product = await Products.findByPk(productId);
      if (!product) {
        return generateErrorResponse(res, "Product not found", 404, {});
      }
      if (product.quantity < quantity) {
        return generateErrorResponse(res, "Insufficient stock", 400, {});
      }
      product.quantity = product.quantity - quantity;
      const updatedStock = await product.save();
      return generateSuccessResponse(
        res,
        "Stock removed successfully",
        200,
        updatedStock
      );
    } catch (err) {
      return generateErrorResponse(
        res,
        err.message || "Internal server error",
        err.status || 500,
        err
      );
    }
  }
}

module.exports = new ProductController();
