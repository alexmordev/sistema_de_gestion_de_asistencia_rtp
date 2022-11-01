//const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require("sequelize");

class ReporteTransmitidosService {
    constructor() {}





    async getForm() {

      const tipoEmpleado = [ { "clave": 1, "descripcion": "BASE"},{"clave": 2, "descripcion": "CONFIANZA-ESTRUCTURA"} ]

      return {tipoEmpleado};

    }

}

module.exports = ReporteTransmitidosService;