const sequelize = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CategoriesService {

  async getById(id) {
    const category = await sequelize.models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound("Category not found");
    }
    return category;
  }

  async getAll() {
    const categorys = await sequelize.models.Category.findAll();
    return categorys;
  }

  async create(data) {
    const category = await sequelize.models.Category.create(data);
    return category;
  }

  async update(id, data) {
    const category = await this.getById(id);
    const result = await category.update(data);
    return result;
  }

  async delete(id) {
    const category = await this.getById(id);
    await category.destroy();
  }
}

module.exports = CategoriesService;
