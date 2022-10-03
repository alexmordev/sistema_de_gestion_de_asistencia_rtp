const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../database/models');

const options = {
    dialect: 'postgres',
    logging: true
}
const PASSWORD = encodeURIComponent( config.password );

const URL = `postgres://${config.username}:${PASSWORD}@${config.host}:${config.port}/${config.database}`;
const sequelize =  new Sequelize(URL, options )
setupModels(sequelize);

module.exports = sequelize;