'use strict';
const { RamoSeguroSchema, RAMOSEGURO_TABLE } = require('../models/ramoSeguro.model');
const { TipoIncapacidadSchema, TIPOINCAPACIDAD_TABLE } = require('../models/tipoIncapacidad.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( RAMOSEGURO_TABLE, RamoSeguroSchema );
    await queryInterface.createTable( TIPOINCAPACIDAD_TABLE, TipoIncapacidadSchema );
  },

  async down (queryInterface) {
    await queryInterface.dropTable( RAMOSEGURO_TABLE );
    await queryInterface.dropTable( TIPOINCAPACIDAD_TABLE );
  }
};
