'use strict';
const { DataTypes} = require('sequelize');
const { ALTASSGA_TABLE, AltaSGASchema } = require('../models/AltasSGA.model');
const { CATALOGO_CONCEPTOS_TABLE, CatalogoConceptosSGASchema } = require('../models/CatalogoConcepto.model');
const { JUSTIFICACION_TABLE, JustificacionTableSGASchema } = require('../models/Justificacion.model');
const { TRANSMISION_APLICAION_TABLE, TransmisionAplicacionSGASchema } = require('../models/Transmision.model');
const { RAMOSEGURO_TABLE, RamoSeguroSchema } = require('../models/RamoSeguro.model');
const { TIPOINCAPACIDAD_TABLE,TipoIncapacidadSchema } = require('../models/TipoIncapacidad.model');
const { INCAPACIDAD_TABLE, IncapacidadSGASchema } = require('../models/Incapacidad.model')

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( CATALOGO_CONCEPTOS_TABLE, CatalogoConceptosSGASchema );
    await queryInterface.createTable( RAMOSEGURO_TABLE, RamoSeguroSchema );
    await queryInterface.createTable( TIPOINCAPACIDAD_TABLE,TipoIncapacidadSchema );
    await queryInterface.createTable( ALTASSGA_TABLE, AltaSGASchema );
    await queryInterface.createTable( INCAPACIDAD_TABLE, IncapacidadSGASchema );
    await queryInterface.createTable( TRANSMISION_APLICAION_TABLE, TransmisionAplicacionSGASchema );
    await queryInterface.createTable( JUSTIFICACION_TABLE, JustificacionTableSGASchema );
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
    await queryInterface.dropTable( TRANSMISION_APLICAION_TABLE );
    await queryInterface.dropTable( ALTASSGA_TABLE );
    await queryInterface.dropTable( JUSTIFICACION_TABLE );
    await queryInterface.dropTable( CATALOGO_CONCEPTOS_TABLE);
    await queryInterface.dropTable( RAMOSEGURO_TABLE );
    await queryInterface.dropTable( TIPOINCAPACIDAD_TABLE);
    await queryInterface.dropTable( INCAPACIDAD_TABLE);
    
  }
};