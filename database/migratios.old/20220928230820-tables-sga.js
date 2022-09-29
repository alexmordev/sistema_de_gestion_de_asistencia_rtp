'use strict';
const { AltaSGASchema, ALTASSGA_TABLE } = require('../models/altasSGA.model');
const { RamoSeguroSchema, RAMOSEGURO_TABLE } = require('../models/ramoSeguro.model');
const { TipoIncapacidadSchema, TIPOINCAPACIDAD_TABLE } = require('../models/tipoIncapacidad.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( ALTASSGA_TABLE, AltaSGASchema );
    await queryInterface.createTable( RAMOSEGURO_TABLE, RamoSeguroSchema );
    await queryInterface.createTable( TIPOINCAPACIDAD_TABLE, TipoIncapacidadSchema );
  },

  async down (queryInterface) {
    await queryInterface.dropTable( ALTASSGA_TABLE );
    await queryInterface.dropTable( RAMOSEGURO_TABLE );
    await queryInterface.dropTable( TIPOINCAPACIDAD_TABLE );
  }
};
