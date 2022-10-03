const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../libs/conexion');
const AltasSGA = require('./altasSGA.model');
const TRABAJADOR_TABLE = 'trabajador_vista';
const TrabajadorSGASchema = {

    trab_Credencial:{
        field: 'trab_credencial',
        allowNull:false, 
        unique: true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },

    tipo_Trab_Div: {
        field: 'tipo_trab_div',
        type: DataTypes.STRING(2)
    },

    tipo_Trab_Proc: {
        field: 'tipo_trab_proc',
        type: DataTypes.STRING(2)
    },

    nombre_Completo: {
        field: 'nombre_completo',
        type: DataTypes.STRING
    },

    trab_curp: {
        field: 'trab_curp',
        type: DataTypes.STRING(20)
    },

    trab_No_Afiliacion: {
        field: 'trab_no_afiliacion',
        type: DataTypes.STRING
    },

    trab_Rfc: {
        field: 'trab_rfc',
        type: DataTypes.STRING(20)
    },

    tipo_Trab_Descripcion: {
        field: 'tipo_trab_descripcion',
        type: DataTypes.STRING(50)
    },

    puesto_Descripcion: {
        field: 'puesto_descripcion',
        type: DataTypes.STRING(100)
    },

    adscripcion: {
        type: DataTypes.STRING
    },

    trab_Status: {
        type: DataTypes.INTEGER,
        field: 'trab_status',
    },

    trab_Status_Desc: {
        field: 'trab_status_desc',
        type: DataTypes.STRING
    },

    trab_Sex_Cve: {
        field: 'trab_sex_cve',
        type: DataTypes.INTEGER
    },

    trab_Sex_Desc: {
        field: 'trab_sex_desc',
        type: DataTypes.STRING(20)
    },

    trab_Foto: {
        field: 'trab_foto',
        type: DataTypes.STRING
    }
};

class Trabajador extends Model {
    static asociate(models){
        this.hasMany( model.AltasSGA,{
            foreignKey:'id_trabajador'
        })
    }

    static config(sequelize){
        return{
            sequelize,
            modelName: 'Trabajador',
            tableName: 'TRABAJADOR_TABLE',
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