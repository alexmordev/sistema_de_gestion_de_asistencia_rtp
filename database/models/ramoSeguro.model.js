const { Model, DataTypes, Sequelize } = require('sequelize');
const RAMOSEGURO_TABLE = 'catalogo_ramo_seguro'; //definir nombre tabla;
const RamoSeguroSchema = {
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    }    
}
class RamoSeguro extends Model{
    static associciate(models){
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: RAMOSEGURO_TABLE,
            modelName: 'RamoSeguro',
            timestamps: false  
        }
    }
}
module.exports= {RAMOSEGURO_TABLE,RamoSeguroSchema,RamoSeguro };