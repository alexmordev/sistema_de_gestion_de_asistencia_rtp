const { Model, DataTypes } = require('sequelize');
const {TIPOINCAPACIDAD_TABLE} = require('./catalogo_Tipo_Incapacidad.model')
const {RAMOSEGURO_TABLE} = require('./catalogo_Ramo_Seguro.model')

const INCAPACIDAD_TABLE = 'incapacidades';
const IncapacidadSGASchema = {
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
        // defaultValue: Sequelize.NOW
    },
    id_Tipo_Incapacidad:{
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_tipo_incapacidad',
        references:{
            model:TIPOINCAPACIDAD_TABLE,
            key:'tipo'
        }
    },

    id_Ramo_Seguro:{
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_ramo_seguro',
        references:{
            model:RAMOSEGURO_TABLE,
            key:'id'
        }
    },

    motivo:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'motivo',
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
class Incapacidad extends Model{
    static associciate(models){
        this.belongsTo(models.TipoIncapacidad, {
            foreignKey: 'id'
        }),
        this.belongsTo(models.RamoSeguro, {
            foreignKey: 'id'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: INCAPACIDAD_TABLE,
            modelName: 'Incapacidad',
            timestamps: false 
        }
    }
}
module.exports= {INCAPACIDAD_TABLE,IncapacidadSGASchema,Incapacidad};