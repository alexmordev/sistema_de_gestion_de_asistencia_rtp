class FormatingDate {
    constructor(){}
    static dateFormated( fechaInicio, fechaFinal ){
        if(!fechaInicio.slice(0,3).includes('/') ){ //|| !fechaInicio.slice(0,3).includes('-') 
            const diaResponseInicio = fechaInicio.slice(8,10)
            const mesResponseInicio = fechaInicio.slice(5,7)
            const añoResponseInicio = fechaInicio.slice(0,4)
            const dateFormatedInit = `${diaResponseInicio}/${mesResponseInicio}/${añoResponseInicio}`

            const diaResponseFinal = fechaFinal.slice(8,10)
            const mesResponseFinal = fechaFinal.slice(5,7)
            const añoResponseFinal = fechaFinal.slice(0,4)
            const dateFormatedEnd = `${diaResponseFinal}/${mesResponseFinal}/${añoResponseFinal}`
            console.log(dateFormatedEnd, dateFormatedInit);

            return { dateFormatedInit, dateFormatedEnd }
        }else{
            const diaInicio = fechaInicio.slice(0,2)
            const mesInicio = fechaInicio.slice(3,5)
            const añoInicio = fechaInicio.slice(6,10)
            const dateFormatedInit = `${mesInicio}/${diaInicio}/${añoInicio}`;
        
            const diaFinal = fechaFinal.slice(0,2)
            const mesFinal = fechaFinal.slice(3,5)
            const añoFinal = fechaFinal.slice(6,10)
            const dateFormatedEnd = `${mesFinal}/${diaFinal}/${añoFinal}`;

            return { dateFormatedInit, dateFormatedEnd }
           
        }
    }
}
module.exports =  FormatingDate 