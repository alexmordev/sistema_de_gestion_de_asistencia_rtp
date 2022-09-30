const { Model, DataTypes } = require('sequelize');

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
class Incapacidad extends Model{
    static associciate(models){
 
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