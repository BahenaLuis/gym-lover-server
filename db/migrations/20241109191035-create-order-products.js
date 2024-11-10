'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { ORDER_PRODUCT_TABLE } = require('./../models/order-product.model');
const { ORDER_TABLE } = require('./../models/order.model');
const { PRODUCT_TABLE } = require('./../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    const orderProductAttributes = {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    };

    await queryInterface.createTable(ORDER_PRODUCT_TABLE, orderProductAttributes);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
