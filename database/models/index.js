const { AltasSGA, AltaSGASchema }= require('./altasSGA.model');
const { Trabajador, TrabajadorSGASchema } = require('./trabajador.model');



function setupModels(sequelize){
    AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ));
    Trabajador.init(TrabajadorSGASchema,Trabajador.config( sequelize) );
   
    // RamoSeguro.init(RamoSeguroSchema, RamoSeguro.config( sequelize ));
    // TipoIncapacidad.init(TipoIncapacidadSchema, TipoIncapacidad.config( sequelize ));

    
    /**
     * After to do all tables, you must to define the relations
     */
    Trabajador.associate( sequelize.models );
    AltasSGA.associate( sequelize.models );

    //  Incapacidad.associciate( sequelize.models );
   
}
module.exports = setupModels


// const { AltasSGA, AltaSGASchema } = require('./altasSGA.model');
// const { Incapacidad,  IncapacidadSGASchema } = require('./incapacidad.model');
// const { TipoIncapacidad, TipoIncapacidadSchema }= require('./tipoIncapacidad.model');
// const { CatalogoConcepto,CatalogoConceptosSGASchema } = require('./catalogoConcepto.model');
// const { RamoSeguro, RamoSeguroSchema }= require('./ramoSeguro.model');
// const { Trabajador, TrabajadorSGASchema } = require('./trabajador.model');
// const { TransmisionAplicaion, TransmisionAplicacionSGASchema } = require('./transmisionAplicaion.model');
// const { Justificacion, JustificacionTableSGASchema } = require('./justificacion.model');


// function setupModels(sequelize){
//     AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ));
//     Trabajador.init(TrabajadorSGASchema, Trabajador.config( sequelize ));   
//     CatalogoConcepto.init(CatalogoConceptosSGASchema, CatalogoConcepto.config( sequelize ));   
//     Incapacidad.init(IncapacidadSGASchema,Incapacidad.config( sequelize ));  
//     RamoSeguro.init(RamoSeguroSchema, RamoSeguro.config( sequelize ));
//     TipoIncapacidad.init(TipoIncapacidadSchema, TipoIncapacidad.config( sequelize ));   
//     TransmisionAplicaion.init(TransmisionAplicacionSGASchema, TransmisionAplicaion.config( sequelize ));   
//     Justificacion.init(JustificacionTableSGASchema, Justificacion.config( sequelize ));   


//     // AltasSGA.asociate( sequelize.models );
//     AltasSGA.asociate( sequelize.models);
//     Trabajador.asociate( sequelize.models );
//     CatalogoConcepto.associciate( sequelize.models );   
//     TipoIncapacidad.associciate( sequelize.models );   
//     RamoSeguro.associciate( sequelize.models );
//     Incapacidad.associciate( sequelize.models );
//     TransmisionAplicaion.associciate( sequelize.models );   
     
// }
// module.exports = setupModels