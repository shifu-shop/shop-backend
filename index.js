"use strict";

const express = require('express');
const app = express();
const server = require('http').Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');



const photoRoute = express.Router();
app.use('/photos', photoRoute);

const config = require('./config/index');

const dbURI = "mongodb://" +
    encodeURIComponent(config.db.username) + ":" +
    encodeURIComponent(config.db.password) + "@" +
    config.db.host + ":" +
    config.db.port + "/" +
    config.db.name;

mongoose.connect(dbURI, console.log('Succes!'));
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

//THIS!!!
app.use(cors({
    origin: ['http://localhost:8080', 'http://http://80.87.197.194:8080'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true// enable set cookie
}));

//THIS!!!
app.use(function(req, res, next) {
    console.log("WORKING!!!");
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); });


//For public directory
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

require('./router/router')(app);

server.listen(8888, () => {
    console.log('Server started on port 8888');
});
