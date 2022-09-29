const { config } = require('../config/config');

 const USER = encodeURIComponent( config.username );
 const PASSWORD = encodeURIComponent( config.password );
 const URL = `postgres://${USER}:${PASSWORD}@${config.host}:${config.port}/${config.database}`;

 module.exports = {
     development:{
         url:URL,
         dialect: 'postgres',
     },
     production:{
         url:URL,
         dialect: 'postgres',
     }
 }