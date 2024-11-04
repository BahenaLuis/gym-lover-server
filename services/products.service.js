const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

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

  async getAll() {
    const products = await sequelize.models.Product.findAll({
      include: ['category']
    });
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
