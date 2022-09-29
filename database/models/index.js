const { AltasSGA, AltaSGASchema }= require('./altasSGA.model');
const { RamoSeguro, RamoSeguroSchema }= require('./ramoSeguro.model');
const { TipoIncapacidad, TipoIncapacidadSchema }= require('./tipoIncapacidad.model');


function setupModels(sequelize){
    AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ));
    RamoSeguro.init(RamoSeguroSchema, RamoSeguro.config( sequelize ));
    TipoIncapacidad.init(TipoIncapacidadSchema, TipoIncapacidad.config( sequelize ));
    /**
     * After to do all tables, you must to define the relations
     */
    // User.associciate( sequelize.models );
   
}
module.exports = setupModels