const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../libs/conexion');
// const AltasSGA = require('./altasSGA.model');
const TRABAJADOR_TABLE = 'trabajador_vista';
const TrabajadorSGASchema = {

    trabCredencial:{
        field: 'trab_credencial',
        allowNull:false, 
        unique: true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },

    tipoTrabDiv: {
        field: 'tipo_trab_div',
        type: DataTypes.STRING(2)
    },

    tipoTrabProc: {
        field: 'tipo_trab_proc',
        type: DataTypes.STRING(2)
    },

    nombreCompleto: {
        field: 'nombre_completo',
        type: DataTypes.STRING
    },

    trabCurp: {
        field: 'trab_curp',
        type: DataTypes.STRING(20)
    },

    trabNoAfiliacion: {
        field: 'trab_no_afiliacion',
        type: DataTypes.STRING
    },

    trabRfc: {
        field: 'trab_rfc',
        type: DataTypes.STRING(20)
    },
    moduloClave: {
        field: 'mod_clave',
        type: DataTypes.INTEGER
    },
    modulo: {
        field: 'mod_desc',
        type: DataTypes.STRING
    },

    tipoTrabDescripcion: {
        field: 'tipo_trab_descripcion',
        type: DataTypes.STRING(50)
    },

    puestoDescripcion: {
        field: 'puesto_descripcion',
        type: DataTypes.STRING(100)
    },

    adscripcion: {
        type: DataTypes.STRING
    },

    trabStatus: {
        type: DataTypes.INTEGER,
        field: 'trab_status',
    },

    trabStatusDesc: {
        field: 'trab_status_desc',
        type: DataTypes.STRING
    },

    trabSexCve: {
        field: 'trab_sex_cve',
        type: DataTypes.INTEGER
    },

    trabSexDesc: {
        field: 'trab_sex_desc',
        type: DataTypes.STRING(20)
    },

    moduloClave: {
        field: 'mod_clave',
        type: DataTypes.INTEGER
    },
    modulo: {
        field: 'mod_desc',
        type: DataTypes.STRING
    },


    trabFoto: {
        field: 'trab_foto',
        type: DataTypes.STRING
    }
};

class Trabajador extends Model {
    static associate(models){
        this.hasMany( models.AltasSGA,{
            foreignKey:'id_trabajador'
        })
    }

    static config(sequelize){
        return{
            sequelize,
            modelName: 'Trabajador',
            tableName: TRABAJADOR_TABLE,
            createdAt: false,
            timestamps: false,
        }
    }
}

module.exports = { 
    TRABAJADOR_TABLE,
    TrabajadorSGASchema,
    Trabajador
};