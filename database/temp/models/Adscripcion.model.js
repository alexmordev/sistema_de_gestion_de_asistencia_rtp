const { Model, DataTypes} = require('sequelize');
const {ADS_DIRECCION_TABLE} = require('./AdsDireccion')
const {ADSDEPTO_TABLE} = require('./AdsDepto')
const {ADS_DIV_TABLE} = require('./AdsDiv') 

const ADSCRIPCION_TABLE = 'adscripcion'; 
const AdscripcionSchema = {
    adsc_Cve:{
        allowNull:false, 
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    dir_Cve:{
        field:"dir_cve",
        type: DataTypes.INTEGER,
        references: {
            model: ADS_DIRECCION_TABLE,
            key: 'dir_cve'
        } 
    },
    ger_Cve:{
        field:"ger_Cve",
        type: DataTypes.INTEGER,
    },
    depto_Cve:{
        field:"depto_cve",
        allowNull:false,
        type: DataTypes.INTEGER,
        references: {
            model: ADSDEPTO_TABLE,
            key: 'depto_cve'
        } 
    },
    of_Cve:{
        field:"of_cve",
        type: DataTypes.INTEGER,
    },
    adsc_Lugar_Cve:{
        field:"adsc_lugar_cve",
        type: DataTypes.INTEGER,
    },
    adsc_Div_Cve:{
        field:"adsc_div_cve",
        type: DataTypes.INTEGER,
        references: {
            model: ADS_DIV_TABLE,
            key: 'adsc_div_cve'
        } 
    },
    adsc_Numero:{
        field:"adsc_numero",
        type: DataTypes.STRING,
    },
    mod_Cve:{
        field:"mod_cve",
        type: DataTypes.INTEGER,
    },
    adsc_Depende:{
        field:"adsc_depende",
        type: DataTypes.INTEGER,
    },
    adsc_Status:{
        field:"adsc_status",
        type: DataTypes.INTEGER,
    },
}

class Adscripcion extends Model{
    static associate(models) {
        this.belongsTo(models.AdsDepto, { as:"AdsDepto" })
        this.belongsTo(models.AdsDireccion, { as:"AdsDireccion" })
        this.belongsTo(models.AdsDiv, { as:"AdsDiv" })
      };
    static config(sequelize){
        return{
            sequelize,
            tableName: ADSCRIPCION_TABLE,
            modelName: 'Adscripcion',
            createdAt: false,
            timestamps: false,
        }
    }
}

module.exports = { 
    ADSCRIPCION_TABLE,
    AdscripcionSchema,
    Adscripcion
};