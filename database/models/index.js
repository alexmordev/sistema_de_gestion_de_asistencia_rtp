const { AltasSGA, AltaSGASchema }= require('./altasSGA.model');
const { Trabajador, TrabajadorSGASchema } = require('./trabajador.model');
const { Incapacidad,  IncapacidadSGASchema } = require('./incapacidad.model');
const { CatalogoConcepto,CatalogoConceptosSGASchema } = require('./catalogoConcepto.model');
const { Justificacion, JustificacionTableSGASchema } = require('./justificacion.model');
const { Transmision, TransmisionAplicacionSGASchema } = require('./transmision.model');

function setupModels(sequelize){

    Incapacidad.init(IncapacidadSGASchema,Incapacidad.config( sequelize) )
    Trabajador.init(TrabajadorSGASchema,Trabajador.config( sequelize) )
    CatalogoConcepto.init(CatalogoConceptosSGASchema, CatalogoConcepto.config( sequelize )) 
    AltasSGA.init(AltaSGASchema, AltasSGA.config( sequelize ))
    Justificacion.init(JustificacionTableSGASchema, Justificacion.config( sequelize ))
    Transmision.init(TransmisionAplicacionSGASchema, Transmision.config( sequelize ))
    
    //Associations
    Transmision.associate( sequelize.models )
    CatalogoConcepto.associate( sequelize.models )
    AltasSGA.associate( sequelize.models )
    Trabajador.associate( sequelize.models )
    Incapacidad.associate( sequelize.models )
    Justificacion.associciate( sequelize.models )


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