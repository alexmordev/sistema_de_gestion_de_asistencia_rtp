'use strict';
const { DataTypes} = require('sequelize');

const { INCAPACIDAD_TABLE } = require('../models/incapacidad.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn( INCAPACIDAD_TABLE, 'clave_seguro',{
      allowNull: true,
      type: DataTypes.STRING,
      field: 'clave_seguro',
      unique: true
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn( INCAPACIDAD_TABLE, 'clave_seguro',{});
  }
};
