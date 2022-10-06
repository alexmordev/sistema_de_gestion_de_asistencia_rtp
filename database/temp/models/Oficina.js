const { Model, DataTypes, Sequelize } = require('sequelize');

const OFICINA_TABLE = 'adsc_oficina'; 
const OficinaSchema = {
    oficina_cve: {
        allowNull:false, 
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    oficina_nombre: {
        type: DataTypes.STRING
    },
    oficina_desc: {
        type: DataTypes.STRING
    },
    oficina_nombre_ant: {
        type: DataTypes.STRING
    },
    oficina_desc_ant: {
        type: DataTypes.STRING
    },
    oficina_status: {
        type: DataTypes.INTEGER
    },
}

class Oficina extends Model{
    static associciate(models){
        // this.hasOne( models.Trabajador) 
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: ESCOLARIDAD_TABLE,
            modelName: 'Oficina',
            createdAt: false,
            timestamps: false
        }
    }
}

module.exports= {OFICINA_TABLE,OficinaSchema,Oficina };