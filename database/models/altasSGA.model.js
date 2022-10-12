const { Model, DataTypes, Sequelize } = require('sequelize');

const ALTASSGA_TABLE = 'altas_sga'; //definir nombre tabla;
const AltaSGASchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    idTrabajador: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_trabajador',
        references:{
            model: 'trabajador_vista',
            key: 'trab_credencial',
        },
    },
    idConcepto: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_concepto',
    },
    idPeriodo: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'id_periodos',
    },
    unidades: {
        allowNull: false,
        // type: DataTypes.DOUBLE(5, 2),
        type: DataTypes.FLOAT(11),
    },
    oficio: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    usuarioCaptura: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'usuario_captura',
    },
    fechaInicio: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'fecha_inicio',
    },
    fechaFinal: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'fecha_final',
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW

    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
    },
}
class AltasSGA extends Model {
    static associate(models) {
        this.belongsTo(models.Trabajador, {
            as: "trabajador_vista",
            foreignKey: 'id_trabajador'
        })
        this.belongsTo( models.Periodo,{
            as:"trab_periodos",
            foreignKey:'id_periodos'
        }),
        this.belongsTo(models.CatalogoConcepto, {
            as: "catalogo_conceptos",
            foreignKey: 'id_concepto'
        })

        this.hasMany(models.Transmision, {
            // as:"transmision",
            foreignKey: 'id_altas_SGA'
        })

        this.hasOne(models.Incapacidad, {
            as:'incapacidad',
            foreignKey: 'id_altas_SGA',
        })

    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: ALTASSGA_TABLE,
            modelName: 'AltasSGA',
            createdAt: true,
            timestamps: true
        }
    }
}
module.exports = { ALTASSGA_TABLE, AltaSGASchema, AltasSGA };