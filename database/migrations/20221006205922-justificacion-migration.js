'use strict';
const { JUSTIFICACION_TABLE, JustificacionTableSGASchema } = require('../models/justificacion.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( JUSTIFICACION_TABLE, JustificacionTableSGASchema );
  },

  async down (queryInterface) {
    await queryInterface.dropTable( JUSTIFICACION_TABLE );
  }
};
