'use strict';
const { AltaSGASchema, ALTASSGA_TABLE } = require('../models/altasSGA.model');
const { INCAPACIDAD_TABLE, IncapacidadSGASchema } = require('../models/incapacidad.model');


module.exports = {
  async up (queryInterface) {
    // await queryInterface.createTable( JUSTIFICACION_TABLE, JustificacionTableSGASchema );
    await queryInterface.createTable( INCAPACIDAD_TABLE, IncapacidadSGASchema );
    await queryInterface.createTable( ALTASSGA_TABLE, AltaSGASchema );
  },

  async down (queryInterface) {
    // await queryInterface.dropTable( JUSTIFICACION_TABLE );
    await queryInterface.dropTable( ALTASSGA_TABLE );
    await queryInterface.dropTable( INCAPACIDAD_TABLE );
  }
};
