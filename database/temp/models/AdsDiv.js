const { Model, DataTypes } = require('sequelize');

const ADS_DIV_TABLE = 'adsc_div'; 
const AdsDivSchema = {
    adsc_Div_Cve:{
        field:"adsc_div_cve",
        allowNull:false, 
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    adsc_Div_Nombre:{
        field:"adsc_div_nombre",
        type: DataTypes.STRING,
    },
    adsc_Div_Desc:{
        field:"adsc_div_desc",
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

class AdsDiv extends Model{
    static associciate(models){
        this.hasMany(models.Adscripcion, {as: 'adscripcion-' , foreignKey: 'adsc_div_cve' })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: ADS_DIV_TABLE,
            modelName: 'AdsDiv',
            createdAt: false,
            timestamps: false,
            comment: "Esta tabla es un catalogo de las divisiones que hay en edascripciones'", 
        }
    }
}
module.exports = { 
    ADS_DIV_TABLE,
    AdsDivSchema,
    AdsDiv
};