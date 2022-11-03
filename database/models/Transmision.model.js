const { Model, DataTypes, Sequelize } = require('sequelize');
const {ALTASSGA_TABLE} = require('./AltasSGA.model');

const TRANSMISION_APLICAION_TABLE = 'transmision'; //definir nombre tabla;
const TransmisionAplicacionSGASchema = {
    id:{
        allowNull:false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idAltasSGA:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'id_altas_SGA',
        primaryKey: true,
        references:{
            model: ALTASSGA_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE', // Esto ocurre al actualizar, un efecto en cascada y tambien se actualiza
        onDelete: 'SET NULL' // Esto ocurre al borrar, se establece a null
    },
    periodo: {
        allowNull:false,
        type: DataTypes.INTEGER,
    },
    unidadesAplicadas:{
        allowNull: false,
        type: DataTypes.FLOAT(11),
        field: 'unidades_aplicadas',
    },
    usuarioCaptura: {
        allowNull:false,
        type: DataTypes.INTEGER,
        field:'usuario_captura'
    },
    transmitido:{
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'create_at',
        defaultValue:Sequelize.NOW
        
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:'updated_at',
    },
}

class Transmision extends Model{
    static associate(models){
        this.belongsTo(models.AltasSGA, {
            as:"altas_sga",
            foreignKey: 'id_altas_SGA'
        }),
        this.belongsTo( models.Periodo,{
            as:"trab_periodos",
            foreignKey:'periodo'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: TRANSMISION_APLICAION_TABLE,
            modelName: 'Transmision',
            createdAt: true,
            timestamps: true
        }
    }
}
module.exports= { TRANSMISION_APLICAION_TABLE, TransmisionAplicacionSGASchema, Transmision };