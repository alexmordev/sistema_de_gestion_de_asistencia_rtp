const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { swapConnection } = require('./libs/ConsultSwap');
const routerApi = require( "./routes" );

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.SGA_PORT;
    this.middleware();
    this.app.use(express.json());
    this.routes();
    //Conection swapt
    // this.dbSwap();
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
  // dbSwap() {
  //   swapConnection();
  // }
  listen() {
    this.app.listen(this.port, () => {
      console.log('Conectado al servidor de RTP', this.port)
    })
  }
}
module.exports = Server;