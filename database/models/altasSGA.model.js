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

/**
 * idTrabajador:{
        allowNull:false, 
        type: DataTypes.INTEGER,
        references:{
            model: TRABAJADOR_TABLE, //importa tu modelo User
            key: 'id',
        },
        onUpdate: 'CASCADE', // Esto ocurre al actualizar, un efecto en cascada y tambien se actualiza
        onDelete: 'SET NULL' // Esto ocurre al borrar, se establece a null
    },
    idConcepto:{
        allowNull:false, 
        type: DataTypes.INTEGER,
        references:{
            model: CONCEPTO_TABLE, //importa tu modelo User
            key: 'id',
        },
        onUpdate: 'CASCADE', // Esto ocurre al actualizar, un efecto en cascada y tambien se actualiza
        onDelete: 'SET NULL' // Esto ocurre al borrar, se establece a null
    }
    ,idPeriodo:{
        allowNull:false, 
        type: DataTypes.INTEGER,
        references:{
            model: PERIODO_TABLE, //importa tu modelo User
            key: 'id',
        },
        onUpdate: 'CASCADE', // Esto ocurre al actualizar, un efecto en cascada y tambien se actualiza
        onDelete: 'SET NULL' // Esto ocurre al borrar, se establece a null
    },

 */