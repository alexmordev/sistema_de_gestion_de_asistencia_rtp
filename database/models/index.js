const { AltasSGA, AltaSGASchema }= require('./AltasSGA.model');
const { Periodo, PeriodoSchema }= require('./Periodo.model');
const { Trabajador, TrabajadorSGASchema } = require('./Trabajador.model');
const { Incapacidad,  IncapacidadSGASchema } = require('./Incapacidad.model');
const { CatalogoConcepto,CatalogoConceptosSGASchema } = require('./CatalogoConcepto.model');
const { TipoIncapacidad, TipoIncapacidadSchema } = require('./TipoIncapacidad.model');
const { RamoSeguro, RamoSeguroSchema } = require('./RamoSeguro.model');
const { Justificacion, JustificacionTableSGASchema } = require('./Justificacion.model');
const { Transmision, TransmisionAplicacionSGASchema } = require('./Transmision.model');
const { Modulo, ModuloSchema } = require('./Modulo.model'); 



function setupModels(sequelize){
    Periodo.init(PeriodoSchema,Periodo.config( sequelize) );
    TipoIncapacidad.init(TipoIncapacidadSchema,TipoIncapacidad.config( sequelize) );
    RamoSeguro.init(RamoSeguroSchema,RamoSeguro.config( sequelize) );
    Incapacidad.init(IncapacidadSGASchema,Incapacidad.config( sequelize) );
    Trabajador.init(TrabajadorSGASchema,Trabajador.config( sequelize) );
    CatalogoConcepto.init(CatalogoConceptosSGASchema, CatalogoConcepto.config( sequelize )); 
    AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ));
    Justificacion.init(JustificacionTableSGASchema, Justificacion.config( sequelize ))
    Transmision.init(TransmisionAplicacionSGASchema, Transmision.config( sequelize ))
    Modulo.init(ModuloSchema, Modulo.config(sequelize) );
    /**
     * After to do all tables, you must to define the relations
    */

    TipoIncapacidad.associate( sequelize.models ); 
    RamoSeguro.associate( sequelize.models ); 
    CatalogoConcepto.associate( sequelize.models ); 
    AltasSGA.associate( sequelize.models );
    Trabajador.associate( sequelize.models );
    Periodo.associate( sequelize.models ); 
    Incapacidad.associate( sequelize.models );
    Justificacion.associciate( sequelize.models )
    Transmision.associate( sequelize.models )
}
module.exports = setupModels
