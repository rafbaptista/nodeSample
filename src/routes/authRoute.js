'use restrict';

const {authenticate} = require('../controllers/authController');

const authRoute = (app) => {

    app.route('/authorize')
        .post((req,res,next) => {
            authenticate(req,res,next);
        })
}

module.exports = authRoute;