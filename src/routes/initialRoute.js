'use strict';

const result = {
    title: "Node Store API",
    version: "0.0.1"
}

const initialRoute = (app) => {
    app.route('/')
    .get((req,res) => res.status(200).send(result))
    .post((req,res) => res.status(200).send(result))
}

module.exports = initialRoute;