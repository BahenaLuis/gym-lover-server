const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UsersService {

  async getById(id) {
    const user = await sequelize.models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("User not found");
    }
    return user;
  }

  async getByEmail(email) {
    const user = await sequelize.models.User.findOne({
      where: { email }
    });
    return user;
  }

  async getAll() {
    const users = await sequelize.models.User.findAll({
      include: ['customer']
    });
    return users;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    const user = await sequelize.models.User.create(data);
    delete user.dataValues.password;
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
