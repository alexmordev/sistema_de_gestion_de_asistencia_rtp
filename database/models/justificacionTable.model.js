const { Model, DataTypes, Sequelize } = require('sequelize');
// const {USER_TABLE} = require('./user.model');
const JUSTIFICACION_TABLE = 'justificacion_sga'; //definir nombre tabla;
const JustificacionTableSGASchema = {
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_Altas_SGA: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'id_altas_SGA',
        defaultValue: Sequelize.NOW
    },
    periodo:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    unidades_justificadas:{
        field: 'unidades_Justificadas',
        allowNull: false,
        type: DataTypes.INTEGER
    }
}
class JustificacionTable extends Model{
    static associciate(models){
        // this.hasMany( models.Product, {
                // as:'product',
                // foreignKey:'categoryId'
        // }) 
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: JUSTIFICACION_TABLE,
            modelName: 'JustificacionTable',
            timestamps: false 
        }
    }
}
module.exports= { JUSTIFICACION_TABLE, JustificacionTableSGASchema,JustificacionTable };
