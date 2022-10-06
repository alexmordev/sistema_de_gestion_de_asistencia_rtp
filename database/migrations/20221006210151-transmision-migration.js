'use strict';
const { TRANSMISION_APLICAION_TABLE, TransmisionAplicacionSGASchema } = require('../models/transmision.model');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( TRANSMISION_APLICAION_TABLE, TransmisionAplicacionSGASchema );
  },

  async down (queryInterface) {
    await queryInterface.dropTable( TRANSMISION_APLICAION_TABLE );
  }
};
