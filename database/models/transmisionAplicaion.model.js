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
    idAltasSga: {
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
    },
    motivo:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    claveSeguro:{
        field: 'clave_seguro',
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