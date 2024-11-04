const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CustomersService {

  async getById(id) {
    const customer = await sequelize.models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound("Customer not found");
    }
    return customer;
  }

  async getAll() {
    const customers = await sequelize.models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async create(data) {
    const customer = await sequelize.models.Customer.create(data, {
      include: ['user']
    });
    return customer;
  }

  async update(id, data) {
    const customer = await this.getById(id);
    const result = await customer.update(data);
    return result;
  }

  async delete(id) {
    const customer = await this.getById(id);
    await customer.destroy();
  }
}

module.exports = CustomersService;
