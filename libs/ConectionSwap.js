const { Client } = require("pg");


const client = new Client({
    user: process.env.USER_SWAP,
    host: process.env.HOST_SWAP,
    database: process.env.DATABASE_SWAP,
    password: process.env.PASSWORD_SWAP,
    port: process.env.PORT_SWAP,
});

module.exports = client;