const { Model, DataTypes } = require('sequelize');

const ADSDEPTO_TABLE = 'adsc_depto'; 
const AdsDeptoSchema = {
    depto_Cve:{
        field:"depto_cve",
        allowNull:false, 
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    depto_Nombre:{
        field:"depto_nombre",
        type: DataTypes.STRING,
    },
    depto_Desc:{
        field:"depto_desc",
        type: DataTypes.STRING,
    },
    depto_Nombre_Ant:{
        field:"depto_nombre_ant",
        type: DataTypes.STRING,
    },
    depto_Desc_Ant:{
        field:"depto_desc_ant",
        type: DataTypes.STRING,
    },
    depto_Status:{
        field:"depto_status",
        type: DataTypes.INTEGER,
    },
}

class AdsDepto extends Model{
    static associciate(models){
        this.hasMany(models.Adscripcion, {as: 'Adscripcion' , foreignKey: 'depto_cve' })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: ADSDEPTO_TABLE,
            modelName: 'AdsDepto',
            createdAt: false,
            timestamps: false,
        }
    }
}

module.exports = {
    ADSDEPTO_TABLE,AdsDeptoSchema,AdsDepto
};