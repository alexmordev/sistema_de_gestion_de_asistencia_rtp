class Mes{

    constructor(aho,month) {
        
        this.aho = aho;
        this.month = month;

    }
  
    calcMes () {
        const fecha = `${this.aho}` + '/' `${this.month}` + '/' + '1';
        const primerDia = new Date(fecha);
        return new Date(primerDia.getFullYear(), primerDia.getMonth() + 1, 0);

    }
 
}

console.log(calcMes());

module.exports = Mes;