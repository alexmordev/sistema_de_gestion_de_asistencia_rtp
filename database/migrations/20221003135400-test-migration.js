'use strict';
const { AltaSGASchema, ALTASSGA_TABLE } = require('../models/altasSGA.model');
const { INCAPACIDAD_TABLE, IncapacidadSGASchema } = require('../models/incapacidades');
const { RamoSeguroSchema, RAMOSEGURO_TABLE } = require('../models/ramoSeguro.model');
const { TipoIncapacidadSchema, TIPOINCAPACIDAD_TABLE } = require('../models/tipoIncapacidad.model');
const { JUSTIFICACION_TABLE, JustificacionTableSGASchema } = require('../models/justificacionTable');
const { CatalogoConceptosSGASchema, CATALOGO_CONCEPTOS } = require('../models/catalogoConcepto');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( RAMOSEGURO_TABLE, RamoSeguroSchema );
    await queryInterface.createTable( TIPOINCAPACIDAD_TABLE, TipoIncapacidadSchema );
    await queryInterface.createTable( INCAPACIDAD_TABLE,IncapacidadSGASchema );
    await queryInterface.createTable( ALTASSGA_TABLE, AltaSGASchema );
    await queryInterface.createTable( JUSTIFICACION_TABLE, JustificacionTableSGASchema );
    await queryInterface.createTable( CATALOGO_CONCEPTOS, CatalogoConceptosSGASchema );
  },

  async down (queryInterface) {
    await queryInterface.dropTable( RAMOSEGURO_TABLE );
    await queryInterface.dropTable( INCAPACIDAD_TABLE );
    await queryInterface.dropTable( TIPOINCAPACIDAD_TABLE );
    await queryInterface.dropTable( ALTASSGA_TABLE );
    await queryInterface.dropTable( JUSTIFICACION_TABLE );
    await queryInterface.dropTable( CATALOGO_CONCEPTOS );
  }
};
