const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

class OrdersService {

  async getById(id) {
    const order = await sequelize.models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: 'user'
        },
        'items'
      ]
    });

    if (!order) {
      throw boom.notFound("Order not found");
    }
    return order;
  }

  async getAll() {
    const orders = await sequelize.models.Order.findAll();
    return orders;
  }

  async getByUser(userId) {
    const orders = await sequelize.models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: 'user'
        }
      ]
    });
    return orders;
  }

  async create(data) {
    const customer = await sequelize.models.Customer.findByPk(data.customerId);
    if (!customer) {
      throw boom.badRequest("Invalid customer");
    }

    const order = await sequelize.models.Order.create(data, {
      include: ['customer']
    });
    return order;
  }

  async addItem(data) {
    const order = await sequelize.models.Order.findByPk(data.orderId);
    if (!order) {
      throw boom.badRequest("Invalid order");
    }

    const product = await sequelize.models.Product.findByPk(data.productId);
    if (!product) {
      throw boom.badRequest("Invalid product");
    }

    const orderProduct = await sequelize.models.OrderProduct.create(data);
    return orderProduct;
  }

  async update(id, data) {
    const order = await this.getById(id);
    const result = await order.update(data);
    return result;
  }

  async delete(id) {
    const order = await this.getById(id);
    await order.destroy();
  }
}

module.exports = OrdersService;
