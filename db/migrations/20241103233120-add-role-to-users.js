'use strict';
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('./../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    const attributeRole = {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer'
    };

    await queryInterface.addColumn(USER_TABLE, 'role', attributeRole);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
