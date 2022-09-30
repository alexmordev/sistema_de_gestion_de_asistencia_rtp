const { Model, DataTypes, Sequelize } = require('sequelize');
// const {USER_TABLE} = require('./user.model');
const JUSTIFICACION_TABLE = 'altas_sga'; //definir nombre tabla;
const JustificacionSGASchema = {
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    fechaCaptura: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_captura',
        defaultValue: Sequelize.NOW
    },
    unidades:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    oficio:{
        allowNull: false,
        type: DataTypes.STRING
    },
    fechaInicio:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_inicio',
    },
    fechaFinal:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha_final',
    }
    
    
}
class AltasSGA extends Model{
    static associciate(models){
        // this.hasMany( models.Product, 
        //     {
        //         as:'product',
        //         foreignKey:'categoryId'

        //     } 
        // ) 
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: JUSTIFICACION_TABLE,
            modelName: 'justificacion',
            timestamps: false 
        }
    }
}
module.exports= {ALTASSGA_TABLE: JUSTIFICACION_TABLE,AltaSGASchema: JustificacionSGASchema,AltasSGA };
