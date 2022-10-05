const { Model, DataTypes } = require('sequelize');

const ADS_DIRECCION_TABLE = 'adsc_direccion'; 
const Ads_direccionSchema = {
    dir_Cve:{
        field:"dir_cve",
        allowNull:false, 
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    dir_Nombre:{
        field:"dir_nombre",
        type: DataTypes.STRING,
    },
    dir_Desc:{
        field:"dir_desc",
        type: DataTypes.STRING
    },
    dir_Status:{
        field:"dir_status",
        type: DataTypes.INTEGER
    }
}

class AdsDireccion extends Model{
    static associciate(models){
        this.hasMany(models.Adscripcion, {as: 'adscripcion' , foreignKey: 'dir_cve' })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: ADS_DIRECCION_TABLE,
            modelName: 'AdsDireccion',
            createdAt: false,
            timestamps: false,
        }
    }
}

module.exports = {
    ADS_DIRECCION_TABLE,
    Ads_direccionSchema,
    AdsDireccion
};