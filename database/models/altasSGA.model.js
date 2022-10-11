const { Model, DataTypes, Sequelize } = require('sequelize');
<<<<<<< HEAD
const sequelize = require('../libs/conexion');
const Trabajador = require('./Trabajador');

class Altas extends Model {
  static asociate(Trabajador){
    this.belongsTo( Trabajador,{
      foreignKey:'id_trabajador'
    })
  }
}
Altas.init({
    id:{
        allowNull:false, 
=======

const ALTASSGA_TABLE = 'altas_sga'; //definir nombre tabla;
const AltaSGASchema = {
    id: {
        allowNull: false,
>>>>>>> 57046f83ee0b9571a52b1b38fa3fdf4ad485ec6b
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
<<<<<<< HEAD
    id_trabajador: {
      allowNull:false, 
      type: DataTypes.INTEGER,
      references: {
        model: Trabajador,
        key: 'trab_credencial'
      }
    },
    id_periodo: {
      type: DataTypes.INTEGER,
    },
    fechaCaptura: {
=======
    idTrabajador: {
>>>>>>> 57046f83ee0b9571a52b1b38fa3fdf4ad485ec6b
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
<<<<<<< HEAD
    usuario_captura:{
      allowNull: false,
      type: DataTypes.INTEGER
    },
    fechaInicio:{
=======
    unidades: {
>>>>>>> 57046f83ee0b9571a52b1b38fa3fdf4ad485ec6b
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
<<<<<<< HEAD
    }
    
  },{
    sequelize,
    tableName: 'altas_sga',
    modelName: 'Altas',
    timestamps: false 
  });
 
module.exports= Altas;
=======
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

        this.hasMany(models.Incapacidad, {
            foreignKey: 'id_altas_SGA'
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
>>>>>>> 57046f83ee0b9571a52b1b38fa3fdf4ad485ec6b
