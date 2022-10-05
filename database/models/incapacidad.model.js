const { Model, DataTypes } = require('sequelize');
const {TIPOINCAPACIDAD_TABLE} = require('./tipoIncapacidad.model')
const {RAMOSEGURO_TABLE} = require('./ramoSeguro.model')
const {ALTASSGA_TABLE} = require('./altasSGA.model')

const INCAPACIDAD_TABLE = 'incapacidad';
const IncapacidadSGASchema = {
    
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },

    idAltasSGA: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_altas_SGA',
        primaryKey: true,
            // references:{
            //     model:ALTASSGA_TABLE,
            //     key:'id'
            // }
    },

    idTipoIncapacidad:{
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_tipo_incapacidad',
        references:{
            model:TIPOINCAPACIDAD_TABLE,
            key:'id'
        }
    },

    idRamoSeguro:{
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
    },

    umf:{
        allowNull: false,
        type: DataTypes.INTEGER,
    },

    riesgoTrabajo:{
        field: 'riesgo_trabajo',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },

    fechaExpedicion:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_expedicion',
    },

    posibleCovid:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'posible_covid',
    }
     
}
class Incapacidad extends Model{
    static associciate(models){
        // this.belongsTo(models.TipoIncapacidad, {
        //     foreignKey: 'id_altas_SGA'
        // }),
        // this.belongsTo(models.RamoSeguro, {
        //     foreignKey: 'id'
        // })
       
        this.hasMany( models.AltasSGA,{
            foreignKey:'id_altas_SGA'
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