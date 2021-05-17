'use strict'

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authService = require('./services/authService');

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString);

//Models
const Product = require('./models/product');
const Customer = require('./models/customer');

//body parser middleware - must come before routes
app.use(express.urlencoded({extended: true}));
app.use(express.json({
    limit: '5mb'
}));

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

//Routes allowed without authentication
const authRoute = require('./routes/authRoute')(app);

//global Auth middleware 
app.use((req,res,next) => {
    authService.authorize(req,res,next);
});

//Routes
const initialRoute = require('./routes/initialRoute')(app);
const productRoute = require('./routes/productRoute')(app);
const customerRoute = require('./routes/customerRoute')(app);

module.exports = app;