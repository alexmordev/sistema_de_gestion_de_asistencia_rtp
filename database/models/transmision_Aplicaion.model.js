const { Model, DataTypes } = require('sequelize');
const { ALTASSGA_TABLE } = require('./altasSGA.model')

const TRANSMISION_APLICACION_TABLE = 'transmision_aplicaion';
const TransmisionAplicacionSGASchema = {
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_Altas_Sga: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_altas_SGA',
        primaryKey: true,
        references:{
            model:ALTASSGA_TABLE,
            key:'id'
        }
    },
    tipo:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'tipo',
    },
    motivo:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'motivo',
    },
    clave_Seguro:{
        field: 'clave_seguro',
        allowNull: false,
        type: DataTypes.STRING,
    },
    umf:{
        field: 'umf',
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    riesgo_Trabajo:{
        field: 'riesgo_trabajo',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    fecha_Expedicion:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_expedicion',
    },
    posible_Covid:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'posible_covid',
    }
     
}
class TransmisionAplicaion extends Model{
    static associciate(models){
        this.belongsTo(models.AltasSGA, {
            foreignKey: 'id'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: TRANSMISION_APLICACION_TABLE,
            modelName: 'TransmisionAplicaion',
            timestamps: false 
        }
    }
}
module.exports= { TRANSMISION_APLICACION_TABLE, TransmisionAplicacionSGASchema, TransmisionAplicaion };