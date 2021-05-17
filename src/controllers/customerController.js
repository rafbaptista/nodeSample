'use strict';

const Validator = require('validatorjs');
const config = require('../config');
const md5 = require('md5');
const {validationRules,validationErrorMessages} = require('../validations/customerValidations');
const customerRepository = require('../repositories/customerRepository');

exports.get = async(req,res,next) => {
    try 
    {
        const data = await customerRepository.get();
        res.status(200).send(data);

    } catch (error) 
    {
        res.status(500).send({success: false, message: 'Falha ao processar sua requisição'});
    }
}

exports.getById = async(req,res,next) => {
    try 
    {
        const data = await customerRepository.getById(req.params.id)
        res.status(200).send(data);
    } 
    catch (error) 
    {
        res.status(500).send({success: false, message: 'Falha ao consultar produto', data: error});
    }
}

exports.post = async(req,res,next) => {
    const result = new Validator(req.body,validationRules,validationErrorMessages);
    
    if (!result.passes()) 
        return res.status(400).send({success: false, message: 'Falha ao cadastrar usuário', data: result.errors});   

    try
    {
        await customerRepository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + config.privateKey),
            roles: req.body.roles
        });
        //await customerRepository.create(req.body);
        res.status(201).send({success: true, message: 'Usuário cadastrado com sucesso'});
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({success: false, message: 'Falha ao cadastrar o usuário'});
    }    
}