const { Model, DataTypes, Sequelize } = require('sequelize');

const MODULO_TABLE = 'modulo'; 
const ModuloSchema = {
    mod_clave: {
        allowNull:false, 
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    mod_nombre: {
        type: DataTypes.STRING
    },
    mod_direccion: {
        type: DataTypes.STRING
    },
    mod_telefono: {
        type: DataTypes.STRING
    },
    mod_reponsable: {
        type: DataTypes.STRING
    },
    mod_tipo: {
        type: DataTypes.CHAR(1),
        comment: 'tipo de modulo 1 = Modulo operativo 2 = Centros de reconstruccion 3 = Comercializacion 4 = Almacen Central 5 = Modulo dado de baja 6 = Control de bienes 7 = Inactivo'
    },
    mod_desc: {
        type: DataTypes.STRING
    },
    mod_servidor: {
        type: DataTypes.CHAR(15)
    },
    mod_estado: {
        type: DataTypes.BOOLEAN
    },
    mod_maestro: {
        type: DataTypes.BOOLEAN
    },
    mod_estado_almacen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}

class Modulo extends Model{
    static associciate(models){
        // this.hasOne( models.Trabajador) 
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: MODULO_TABLE,
            modelName: 'Modulo',
            createdAt: false,
            timestamps: false
        }
    }
}

module.exports= {MODULO_TABLE,ModuloSchema,Modulo };