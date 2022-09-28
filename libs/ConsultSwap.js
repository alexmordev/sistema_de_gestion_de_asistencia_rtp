// const { Client } = require("pg");
const client = require('./ConectionSwap')

const swapConnection = async () => {

    try {

        await client.connect();
        console.log('Conectado a postgres swap!');

    } catch (error) {
        // console.log(error);
        throw new Error('Error en iniciar conección a base de datos swap');
    }
}

module.exports = {
    swapConnection
}

