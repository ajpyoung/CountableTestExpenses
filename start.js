/*
This is for prototyping purposes only
This assumes no security was made in the local MongoDB service
*/

const express = require('express');
var app = express();
console.log(__dirname);
//configure express
const expConf = require('./server/config/expressConfig');
expConf.conf(app,express);

//configure mongoDB
const mongoDBConf = require('./server/config/mongoDBConf');
mongoDBConf.conf();

//set routes
var router = express.Router();
const mainrouteConf = require('./server/routes/mainRoutes');

mainrouteConf.conf(app,router);

app.listen(8080, () => console.log('Expenses POC listening on port 8080!'))