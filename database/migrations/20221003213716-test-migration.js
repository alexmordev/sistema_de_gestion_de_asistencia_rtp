'use strict';
const { AltaSGASchema, ALTASSGA_TABLE } = require('../models/altasSGA.model');
const { CatalogoConceptosSGASchema, CATALOGO_CONCEPTOS_TABLE } = require('../models/catalogoConcepto.model');
const { INCAPACIDAD_TABLE, IncapacidadSGASchema } = require('../models/incapacidades.model');
const { JUSTIFICACION_AUSENCIA_TABLE, JustificacionSGASchema } = require('../models/justificacionAusencia.model');
const { JUSTIFICACION_TABLE, JustificacionTableSGASchema } = require('../models/justificacionTable.model');
const { RamoSeguroSchema, RAMOSEGURO_TABLE } = require('../models/catalogo_Ramo_Seguro.model');
const { TipoIncapacidadSchema, TIPOINCAPACIDAD_TABLE } = require('../models/catalogo_Tipo_Incapacidad.model');
const { TrabajadorSGASchema, TRABAJADOR_TABLE } = require('../models/trabajador.model');
const { TRANSMISION_APLICACION_TABLE, TransmisionAplicacionSGASchema } = require('../models/transmision_Aplicaion.model');

module.exports = {
  async up (queryInterface) {
    //Arriba va la tabla que tiene el references, si no, no funsiona la migracion
    await queryInterface.createTable( TRABAJADOR_TABLE, TrabajadorSGASchema );
    await queryInterface.createTable( ALTASSGA_TABLE, AltaSGASchema );
    await queryInterface.createTable( CATALOGO_CONCEPTOS_TABLE, CatalogoConceptosSGASchema );
    await queryInterface.createTable( INCAPACIDAD_TABLE,IncapacidadSGASchema );
    await queryInterface.createTable( JUSTIFICACION_AUSENCIA_TABLE,JustificacionSGASchema );
    await queryInterface.createTable( JUSTIFICACION_TABLE, JustificacionTableSGASchema );
    await queryInterface.createTable( RAMOSEGURO_TABLE, RamoSeguroSchema );
    await queryInterface.createTable( TIPOINCAPACIDAD_TABLE, TipoIncapacidadSchema );
    await queryInterface.createTable( TRANSMISION_APLICACION_TABLE, TransmisionAplicacionSGASchema );
  },

  async down (queryInterface) {
    //Aquí es alreves la tabla asociada va abajo
    await queryInterface.dropTable( ALTASSGA_TABLE );
    await queryInterface.dropTable( TRABAJADOR_TABLE );
    await queryInterface.dropTable( CATALOGO_CONCEPTOS );
    await queryInterface.dropTable( INCAPACIDAD_TABLE );
    await queryInterface.dropTable( JUSTIFICACION_AUSENCIA_TABLE );
    await queryInterface.dropTable( JUSTIFICACION_TABLE );
    await queryInterface.dropTable( RAMOSEGURO_TABLE );
    await queryInterface.dropTable( TIPOINCAPACIDAD_TABLE );
    await queryInterface.createTable( TRANSMISION_APLICACION_TABLE, TransmisionAplicacionSGASchema );
  }
};
