'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const { USER_TABLE } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    const customerAttributes = {
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
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name',
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        unique: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    };

    await queryInterface.createTable(CUSTOMER_TABLE, customerAttributes);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
