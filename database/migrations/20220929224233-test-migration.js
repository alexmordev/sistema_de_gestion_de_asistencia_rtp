'use strict';
const { AltaSGASchema, ALTASSGA_TABLE } = require('../models/altasSGA.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable( ALTASSGA_TABLE, AltaSGASchema );
  },

  async down (queryInterface) {
    await queryInterface.dropTable( ALTASSGA_TABLE );
  }
};
