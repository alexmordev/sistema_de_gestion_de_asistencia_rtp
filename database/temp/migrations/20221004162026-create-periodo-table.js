'use strict';
const { PeriodoSchema, PERIODO_TABLE } = require('../../models/periodo.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable( PERIODO_TABLE, PeriodoSchema );
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable( PERIODO_TABLE, PeriodoSchema );
  }
};
