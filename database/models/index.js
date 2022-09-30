const { AltasSGA, AltaSGASchema }= require('./altasSGA.model');
const { IncapacidadSGASchema, Incapacidad } = require('./incapacidades');

function setupModels(sequelize){
    AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ));
    Incapacidad.init(IncapacidadSGASchema,Incapacidad.config( sequelize ));
    
    /**
     * After to do all tables, you must to define the relations
     */
    // User.associciate( sequelize.models );
   
}
module.exports = setupModels