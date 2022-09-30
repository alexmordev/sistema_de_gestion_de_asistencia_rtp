const { Model, DataTypes, Sequelize } = require('sequelize');
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
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
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
    usuario_captura:{
      allowNull: false,
      type: DataTypes.INTEGER
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
    
  },{
    sequelize,
    tableName: 'altas_sga',
    modelName: 'Altas',
    timestamps: false 
  });
 
module.exports= Altas;
