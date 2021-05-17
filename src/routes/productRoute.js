'use restrict';

const {get,post,put,remove,getBySlug,getById, getByTags} = require('../controllers/productController');

const productRoute = (app) => {

    app.route('/products/:id?')
        .get((req,res,next) => {
            get(req,res,next);
        })
        .post((req,res,next) => {
            post(req,res,next);
        })
        .put((req,res,next) => {
            put(req,res,next);
        })
        .delete((req,res,next) => {
            remove(req,res,next)
        }); 

    app.route('/products/slug/:slug')
        .get((req,res,next) => {
            getBySlug(req,res,next);
        })
    
    app.route('/products/id/:id')
        .get((req,res,next) => {
            getById(req,res,next);
        })

    app.route('/products/tags/:tags')
        .get((req,res,next) => {
            getByTags(req,res,next);
        })
};

module.exports = productRoute;