'use strict';

const customerRepository = require('../repositories/customerRepository');
const authService = require('../services/authService');
const config = require('../config');
const md5 = require('md5');

exports.authenticate = async(req,res,next) => {

    const customer = await customerRepository.authenticate({        
        email: req.body.email,
        password: md5(req.body.password + config.privateKey)
    });

    if (!customer)
        return res.status(400).send({sucess: false, message: 'Usuário ou senha inválida'});
    
    const token = await authService.generateToken({
        id: customer.id,
        email: customer.email,
        name: customer.name,
        roles: customer.roles
    });
    
    res.status(201).send({
        token: token,
        data: {
            email: customer.email,
            name: customer.name
        }
    })

    // try
    // {
    //     await customerRepository.create(req.body);
    //     res.status(201).send({success: true, message: 'Usuário cadastrado com sucesso'});
    // } 
    // catch (error) 
    // {
    //     res.status(500).send({success: false, message: 'Falha ao cadastrar o usuário'});
    // }    
}