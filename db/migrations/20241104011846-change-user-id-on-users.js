'use strict';
const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    const userIdAttribute = {
      field: 'user_id',
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    };

    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', userIdAttribute);
  },

  async down (queryInterface) {
  }
};
