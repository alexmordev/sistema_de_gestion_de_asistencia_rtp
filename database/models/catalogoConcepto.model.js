const { Model, DataTypes } = require('sequelize');
// const AltasSGA = require('./altasSGA.model');
const CATALOGO_CONCEPTOS_TABLE = 'catalogo_conceptos'
const CatalogoConceptosSGASchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },

    clave: {
        allowNull: false,
        type: DataTypes.INTEGER
    },

    nombre: {
        allowNull: false,
        type: DataTypes.STRING
    },

    status: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
}
class CatalogoConcepto extends Model {
    static associate(models) {
        this.hasMany(models.AltasSGA, {
       
            foreignKey: 'id_concepto'
        })

    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CATALOGO_CONCEPTOS_TABLE,
            modelName: 'CatalogoConcepto',
            timestamps: false
        }
    }
}

module.exports = {
    CATALOGO_CONCEPTOS_TABLE,
    CatalogoConceptosSGASchema,
    CatalogoConcepto
};