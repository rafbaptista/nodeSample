'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

exports.generateToken = async(data) => {
    return jwt.sign(data,config.privateKey, {expiresIn: '1d'});
}

exports.decodeToken = async(token) => {
    const data = await jwt.verify(token,config.privateKey);
    return data;
}

exports.authorize = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token)  {
        return res.status(401).send({success: false, message: 'Acesso negado'});
    }
    
    jwt.verify(token, config.privateKey, (error,decoded) => {
        if (error)
            return res.status(401).send({success: false, message: 'Token Inválido'});
        else
            next();
    });
}

exports.isAdmin = (req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token)  
        return res.status(401).send({success: false, message: 'Acesso negado'});    

    jwt.verify(token, config.privateKey, (error,decoded) => {
        if (error)
            return res.status(401).send({success: false, message: 'Token Inválido'});
        else if (decoded.roles.includes('admin')) 
            next();        
        else 
            return res.status(403).send({success: false, message: 'Essa funcionalidade é restritra para administradores'});        
    });
}