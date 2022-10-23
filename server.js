const express = require('express');
const morgan = require('morgan');
const { swapConnection } = require('./libs/ConsultSwap');
const  sequelize  = require('./libs/sequelize');
const cors = require('cors');
const routerApi = require( "./routes" );

class Server {
  constructor() {

    this.app = express();
    this.middleware();
    this.app.use(express.json());
    this.routes();

  }
  middleware() {

    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));

  }
  routes() {

    routerApi(this.app);
  }

  listen() {

     this.app.listen(process.env.SGA_PORT, () => {
      sequelize.authenticate().then(() => {
        console.log(`Server port: ${process.env.SGA_PORT} - Connected to database RTP`);
      }).catch(err =>{ 
        console.log({error: 'Error trying to connect to database'});
      })
    })
  }
}
module.exports = Server;