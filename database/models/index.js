const { AltasSGA, AltaSGASchema }= require('./altasSGA.model');
const { CatalogoConcepto,CatalogoConceptosSGASchema } = require('./catalogoConcepto.model');
const { Incapacidad,  IncapacidadSGASchema } = require('./incapacidades.model');
const { TipoIncapacidad, TipoIncapacidadSchema }= require('./catalogo_Tipo_Incapacidad.model');
const { JustificacionAusencia, JustificacionSGASchema } = require('./justificacionAusencia.model');
const { JustificacionTable,JustificacionTableSGASchema } = require('./justificacionTable.model');
const { RamoSeguro, RamoSeguroSchema }= require('./catalogo_Ramo_Seguro.model');
const { Trabajador, TrabajadorSGASchema } = require('./trabajador.model');
const { TransmisionAplicaion, TransmisionAplicacionSGASchema } = require('./transmision_Aplicaion.model');


function setupModels(sequelize){
    AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ));
    CatalogoConcepto.init(CatalogoConceptosSGASchema, CatalogoConcepto.config( sequelize ));   
    Incapacidad.init(IncapacidadSGASchema,Incapacidad.config( sequelize ));
    JustificacionAusencia.init(JustificacionSGASchema, JustificacionAusencia.config( sequelize ));   
    JustificacionTable.init(JustificacionTableSGASchema, JustificacionTable.config( sequelize ));   
    RamoSeguro.init(RamoSeguroSchema, RamoSeguro.config( sequelize ));
    TipoIncapacidad.init(TipoIncapacidadSchema, TipoIncapacidad.config( sequelize ));   
    Trabajador.init(TrabajadorSGASchema, Trabajador.config( sequelize ));   
    TransmisionAplicaion.init(TransmisionAplicacionSGASchema, TransmisionAplicaion.config( sequelize ));   
     
}
module.exports = setupModels