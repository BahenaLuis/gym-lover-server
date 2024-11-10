const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

class ProductsService {

  async getById(id) {
    const product = await sequelize.models.Product.findByPk(id, {
      include: ['category']
    });
    if (!product) {
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async getAll(query) {
    const options = {
      include: ['category'],
      where: {}
    }

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { min_price, max_price } = query;
    if (min_price, max_price) {
      options.where.price = {
        [Op.gte]: min_price,
        [Op.lte]: max_price
      }
    }

    const products = await sequelize.models.Product.findAll(options);
    return products;
  }

  async create(data) {
    const product = await sequelize.models.Product.create(data);
    return product;
  }

  async update(id, data) {
    const product = await this.getById(id);
    const result = await product.update(data);
    return result;
  }

  async delete(id) {
    const product = await this.getById(id);
    await product.destroy();
  }
}

module.exports = ProductsService;
