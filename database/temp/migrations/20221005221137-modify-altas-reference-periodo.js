'use strict';
const { DataTypes} = require('sequelize');

const { ALTASSGA_TABLE } = require('../models/altasSGA.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn( ALTASSGA_TABLE, 'id_periodos',{
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'id_periodos',
      references:{
          model: 'trab_periodos',
          key: 'id_periodos',
      },
  }, );
  },

  async down (queryInterface) {
    // await queryInterface.dropTable( JUSTIFICACION_TABLE );
    // await queryInterface.dropTable( ALTASSGA_TABLE );
    // await queryInterface.dropTable( INCAPACIDAD_TABLE );
  }
};
