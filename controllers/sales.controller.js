const { Sales, Products } = require("../models");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../utils/data.helper");

class SalesController {
  async createSale(req, res) {
    try {
      const { date, productId, quantity } = req.body;
      if (!date || !productId || !quantity) {
        return generateErrorResponse(res, "All fields are required", 400, {});
      }

      const product = await Products.findOne({
        where: { id: productId },
        attributes: ["id", "quantity"],
      });
      if (!product) {
        return generateErrorResponse(res, "Product not found", 404, {});
      }
      if (product.quantity < quantity) {
        return generateErrorResponse(res, "Insufficient stock", 400, {});
      }
      if (new Date(date) < new Date()) {
        return generateErrorResponse(
          res,
          "Date cannot be in the pate",
          400,
          {}
        );
      }

      const sale = await Sales.create({ date, productId, quantity });
      return generateSuccessResponse(
        res,
        "Sale created successfully",
        201,
        sale
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

  async getSales(req, res) {
    try {
      let { page = 1, limit = 10, date } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const offset = (page - 1) * limit;
      if (limit > 100) {
        return generateErrorResponse(
          res,
          "Limit cannot be more than 100",
          400,
          {}
        );
      }
      const whereObj = {};
      if (date) {
        whereObj.date = date;
      }
      if (req.query.productId) {
        whereObj.productId = req.query.productId;
      }
      if (req.query.quantity) {
        whereObj.quantity = req.query.quantity;
      }
      const sales = await Sales.findAndCountAll({
        where: whereObj,
        limit: limit,
        offset: offset,
        order: [["date", "DESC"]],
      });
      return generateSuccessResponse(
        res,
        "Sales retrieved successfully",
        200,
        sales
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
}

module.exports = new SalesController();
