const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../libs/conexion');
const Altas = require('./altas_sga');

// Hacer referencia al modelo de altas_sga
// declarar el foreignKey en los dos modelos en los que se utiliza include
// para los metodos de busqueda (findOne, findAll,...)

// class Altas extends Model {
//     static asociate(Trabajador){
//       this.belongsTo( Trabajador,{
//         foreignKey:'id_trabajador'
//       })
//     }
//   }

class Trabajador extends Model {
    static asociate(Altas){
        this.hasMany( Altas,{
            foreignKey:'id_trabajador'
        })
      }
}
Trabajador.init({
    trab_credencial:{
        allowNull:false, 
        unique: true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    tipo_trab_div: {
        type: DataTypes.STRING(2)
    },
    tipo_trab_proc: {
        type: DataTypes.STRING(2)
    },
    nombre_completo: {
        type: DataTypes.STRING
    },
    trab_curp: {
        type: DataTypes.STRING(20)
    },
    trab_no_afiliacion: {
        type: DataTypes.STRING
    },
    trab_rfc: {
        type: DataTypes.STRING(20)
    },
    tipo_trab_descripcion: {
        type: DataTypes.STRING(50)
    },
    puesto_descripcion: {
        type: DataTypes.STRING(100)
    },
    adscripcion: {
        type: DataTypes.STRING
    },
    trab_status: {
        type: DataTypes.INTEGER
    },
    trab_status_desc: {
        type: DataTypes.STRING
    },
    trab_sex_cve: {
        type: DataTypes.INTEGER
    },
    trab_sex_desc: {
        type: DataTypes.STRING(20)
    },
    trab_foto: {
        type: DataTypes.STRING
    }
    
}, {
  modelName: 'Trabajador',
  tableName: 'trabajador_swap',
  createdAt: false,
  timestamps: false,
  sequelize
  
});
// Trabajador.removeAttribute('id');

module.exports = Trabajador;