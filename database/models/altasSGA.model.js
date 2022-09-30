const { Model, DataTypes, Sequelize } = require('sequelize');
// const {USER_TABLE} = require('./user.model');
const ALTASSGA_TABLE = 'altas_sga'; //definir nombre tabla;
const AltaSGASchema = {
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    id_Trabajador:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'id_trabajador',
    },
    id_Concepto: {
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'id_concepto',
    },
    id_Periodo:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_periodo',
    },
    fecha_Captura:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_captura',
    },
    unidades:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'unidades',
    },
    oficio:{
        allowNull: false,
        type: DataTypes.STRING,
        field: 'oficio',
    },
    usuario_Captura:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'usuario_captura',
    },
    fecha_Inicio:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_inicio',
    },
    fecha_Final:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_final',
    }

}

class AltasSGA extends Model{
    static associciate(models){
        this.hasMany( models.Product, 
            // { as:'product', foreignKey:'categoryId' } 
        ) 
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: ALTASSGA_TABLE,
            modelName: 'AltasSGA',
            timestamps: false 
        }
    }
}
module.exports= {ALTASSGA_TABLE,AltaSGASchema,AltasSGA };