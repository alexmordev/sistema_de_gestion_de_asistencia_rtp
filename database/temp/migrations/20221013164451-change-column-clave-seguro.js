'use strict';
const { DataTypes} = require('sequelize');

const { INCAPACIDAD_TABLE } = require('../models/incapacidad.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn( INCAPACIDAD_TABLE, 'claveSeguro',{
      allowNull: false,
      type: DataTypes.STRING,
      field: 'clave_seguro',
      unique: true
    });
  },

  async down (queryInterface) {
    await queryInterface.changeColumn( INCAPACIDAD_TABLE, 'claveSeguro',{
      allowNull: true,
      type: DataTypes.STRING,
      field: 'clave_seguro',
      unique: true
    });
  }
};
