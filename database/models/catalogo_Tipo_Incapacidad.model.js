const { Model, DataTypes } = require('sequelize');

const TIPOINCAPACIDAD_TABLE = 'catalogo_tipo_incapacidad'; //definir nombre tabla;
const TipoIncapacidadSchema = {
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    
    tipo:{
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER
    }    
}
class TipoIncapacidad extends Model{
    static associciate(models){
        this.hasMany( model.Incapacidad,{
            foreignKey:'id_tipo_incapacidad'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: TIPOINCAPACIDAD_TABLE,
            modelName: 'TipoIncapacidad',
            timestamps: false 
        }
    }
}
module.exports= {TIPOINCAPACIDAD_TABLE,TipoIncapacidadSchema,TipoIncapacidad };