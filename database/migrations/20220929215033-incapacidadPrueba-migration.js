'use strict';
const { INCAPACIDAD_TABLE, IncapacidadSGASchema } = require('../models/incapacidades');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( INCAPACIDAD_TABLE,IncapacidadSGASchema );
  },

  async down (queryInterface) {
    await queryInterface.dropTable( INCAPACIDAD_TABLE );
  }
};
