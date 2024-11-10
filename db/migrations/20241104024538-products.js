'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./../models/category.model');
const { PRODUCT_TABLE } = require('./../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    const categoryAttributes = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    };

    const productAttributes = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      categoryId: {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    };

    await queryInterface.createTable(CATEGORY_TABLE, categoryAttributes);
    await queryInterface.createTable(PRODUCT_TABLE, productAttributes);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
