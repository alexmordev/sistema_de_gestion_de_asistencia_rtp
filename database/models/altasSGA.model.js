const { Model, DataTypes, Sequelize } = require('sequelize');
// const {USER_TABLE} = require('./user.model');
const {PERIODO_TABLE} = require('./periodo.model');

const ALTASSGA_TABLE = 'altas_sga'; //definir nombre tabla;
const AltaSGASchema = {
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idTrabajador:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'id_trabajador',
        references:{
            model: 'trabajador_vista',
            key: 'trab_credencial',
        },
    },
    idConcepto: {
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'id_concepto',
    },
    idPeriodos:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_periodos',
        references:{
            model: 'trab_periodos',
            key: 'id_periodos',
        },
    },
    fechaCaptura:{
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'fecha_captura',
    },
    unidades:{
        allowNull: false,
        // type: DataTypes.DOUBLE(5, 2),
        type: DataTypes.FLOAT(11),
    },
    oficio:{
        allowNull: false,
        type: DataTypes.STRING,
    },
    usuarioCaptura:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'usuario_captura',
    },
    fechaInicio:{
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'fecha_inicio',
    },
    fechaFinal:{
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'fecha_final',
    }

}

class AltasSGA extends Model{
    static associate(models){

        this.belongsTo(models.Trabajador, {
            as:"trabajador_vista",
            foreignKey: 'id_trabajador'
        })
        this.belongsTo( models.Periodo,{
            as:"trab_periodos",
            foreignKey:'id_periodos'
        })

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