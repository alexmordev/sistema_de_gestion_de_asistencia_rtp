const { Model, DataTypes, Sequelize } = require('sequelize');

const GERENCIA_TABLE = 'adsc_gerencia'; 
const GerenciaSchema = {
    ger_cve: {
        allowNull:false, 
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
    },
    ger_nombre: {
        type: DataTypes.STRING
    },
    ger_desc: {
        type: DataTypes.STRING
    },
    ger_nombre_ant: {
        type: DataTypes.STRING
    },
    ger_desc_ant: {
        type: DataTypes.STRING
    },
    ger_status: {
        type: DataTypes.INTEGER
    },
}

class Gerencia extends Model{
    static associciate(models){
        // this.hasOne( models.Trabajador) 
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: GERENCIA_TABLE,
            modelName: 'Gerencia',
            createdAt: false,
            timestamps: false
        }
    }
}

module.exports= {GERENCIA_TABLE,GerenciaSchema,Gerencia };