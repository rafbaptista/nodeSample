'use restrict';

const {get,post,getById} = require('../controllers/customerController');
const authService = require('../services/authService');

const customerRoute = (app) => {

    app.route('/customers')
        //isAdmin interceptor, user must be admin to access this endpoint
        .get(authService.isAdmin,(req,res,next) => { 
            get(req,res,next);
        })
        .post((req,res,next) => {
            post(req,res,next);
        })
    
    app.route('/customers/id/:id')
       .get((req,res,next) => {
            getById(req,res,next);
        })
}

module.exports = customerRoute;