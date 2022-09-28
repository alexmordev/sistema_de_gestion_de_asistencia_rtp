const { AltasSGA, AltaSGASchema }= require('./altasSGA.model');

function setupModels(sequelize){
    AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ));
    
    /**
     * After to do all tables, you must to define the relations
     */
    // User.associciate( sequelize.models );
   
}
module.exports = setupModels