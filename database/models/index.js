const { AltasSGA, AltaSGASchema }= require('./altasSGA.model');
const { Periodo, PeriodoSchema }= require('./periodo.model');
const { Trabajador, TrabajadorSGASchema } = require('./trabajador.model');
const { Incapacidad,  IncapacidadSGASchema } = require('./incapacidad.model');
const { CatalogoConcepto,CatalogoConceptosSGASchema } = require('./catalogoConcepto.model');
const { TipoIncapacidad, TipoIncapacidadSchema } = require('./tipoIncapacidad.model');
const { RamoSeguro, RamoSeguroSchema } = require('./ramoSeguro.model');
const { Justificacion, JustificacionTableSGASchema } = require('./justificacion.model');
const { Transmision, TransmisionAplicacionSGASchema } = require('./transmision.model');

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
