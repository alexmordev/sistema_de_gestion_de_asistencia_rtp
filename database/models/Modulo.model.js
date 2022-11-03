const { Model, DataTypes, BOOLEAN } = require('sequelize');
const MODULO_TABLE = 'modulo';

const ModuloSchema = {

    modClave:{
        field: 'mod_clave',
        allowNull: true,
        unique: true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    modNombre:{
        field: 'mod_nombre',
        type: DataTypes.STRING
    },
    modDireccion:{
        field: 'mod_direccion',
        type: DataTypes.STRING
    },
    modTelefono:{
        field: 'mod_telefono',
        type: DataTypes.STRING
    },
    modResponsable:{
        field: 'mod_reponsable',
        type: DataTypes.STRING
    },
    modTipo: {
        field: 'mod_tipo',
        type: DataTypes.STRING
    },
    modDesc:{
        field: 'mod_desc',
        type: DataTypes.STRING
    },
    modServidor:{
        field: 'mod_servidor',
        type: DataTypes.STRING(15)
    },
    modEstado:{
        field: 'mod_estado',
        type: DataTypes.BOOLEAN
    },
    modMaestro:{
        field: 'mod_maestro',
        type: DataTypes.BOOLEAN
    },
    modEstadoAlmacen:{
        field: 'mod_estado_almacen',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
};

class Modulo extends Model {

    static config(sequelize){
        return{
            sequelize,
            modelName: 'Modulo',
            tableName: MODULO_TABLE,
            createdAt: false,
            timestamps: false,
        }
    }
}

module.exports = { 
    MODULO_TABLE,
    ModuloSchema,
    Modulo
};