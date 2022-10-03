const { AltasSGA, AltaSGASchema }= require('./altasSGA.model');
const { IncapacidadSGASchema, Incapacidad } = require('./incapacidades');
const { RamoSeguro, RamoSeguroSchema }= require('./ramoSeguro.model');
const { TipoIncapacidad, TipoIncapacidadSchema }= require('./tipoIncapacidad.model');
const { JustificacionTable,JustificacionTableSGASchema } = require('./justificacionTable');
const { CatalogoConcepto,CatalogoConceptosSGASchema } = require('./catalogoConcepto');


function setupModels(sequelize){
    AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ));
    Incapacidad.init(IncapacidadSGASchema,Incapacidad.config( sequelize ));
    RamoSeguro.init(RamoSeguroSchema, RamoSeguro.config( sequelize ));
    TipoIncapacidad.init(TipoIncapacidadSchema, TipoIncapacidad.config( sequelize ));   
    JustificacionTable.init(JustificacionTableSGASchema, JustificacionTable.config( sequelize ));   
    CatalogoConcepto.init(CatalogoConceptosSGASchema, CatalogoConcepto.config( sequelize ));   
}
module.exports = setupModels