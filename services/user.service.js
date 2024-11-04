const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

class UsersService {

  async getById(id) {
    const user = await sequelize.models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async getAll() {
    const users = await sequelize.models.User.findAll({
      include: ['customer']
    });
    return users;
  }

  async create(data) {
    const user = await sequelize.models.User.create(data);
    return user;
  }

  async update(id, data) {
    const user = await this.getById(id);
    const result = await user.update(data);
    return result;
  }

  async delete(id) {
    const user = await this.getById(id);
    await user.destroy();
  }
}

module.exports = UsersService;
