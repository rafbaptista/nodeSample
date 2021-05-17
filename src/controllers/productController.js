'use strict';

const Validator = require('validatorjs');
const productRepository = require('../repositories/productRepository');
const {validationRules,validationErrorMessages} = require('../validations/productValidations');

exports.get = async(req,res,next) => {
    try 
    {
        const data = await productRepository.get();
        return res.status(200).send(data);

    } catch (error) 
    {
        return res.status(500).send({success: false, message: 'Falha ao processar sua requisição'});
    }
}

exports.getBySlug = async(req,res,next) => {
    try 
    {
        const data = await productRepository.getBySlug(req.params.slug);
        return res.status(200).send(data);

    } 
    catch (error) 
    {
        return res.status(500).send({success: false, message: 'Falha ao processar sua requisição'});
    }
}

exports.getById = async(req,res,next) => {
    try 
    {
        const data = await productRepository.getById(req.params.id)
        return res.status(200).send(data);
    } 
    catch (error) 
    {
        return res.status(500).send({success: false, message: 'Falha ao consultar produto', data: error});
    }
}

exports.getByTags = async(req,res,next) => {
    try 
    {
        const data = await productRepository.getByTags(req.params.tags);
        return res.status(200).send(data);
    } 
    catch (error) 
    {
        return res.status(500).send({success: false, message: 'Falha ao consultar produto', data: error});
    }
}

exports.post = async(req,res,next) => {
    const result = new Validator(req.body,validationRules,validationErrorMessages);
    
    if (!result.passes()) 
        return res.status(400).send({success: false, message: 'Falha ao cadastrar produto', data: result.errors});   

    try
    {
        await productRepository.create(req.body);
        return res.status(201).send({success: true, message: 'Produto cadastrado com sucesso'});
    } 
    catch (error) 
    {
        return res.status(500).send({success: false, message: 'Falha ao cadastrar o produto'});
    }    
}

exports.put = async(req,res,next) => {    
    const result = new Validator(req.body,validationRules,validationErrorMessages);
 
    if (!result.passes()) 
        return res.status(400).send({success: false, message: 'Falha ao atualizar produto', data: result.errors});

    try 
    {
        await productRepository.update(req.params.id,req.body);
        return res.status(200).send({success: true, message: 'Produto atualizado com sucesso'});
    }
    catch (error)
    {
        return res.status(200).send({success: true, message: 'Falha ao atualizar o produto'});
    } 
}

exports.remove = async(req,res,next) => {
    try 
    {
        await productRepository.delete(req.params.id);
        return res.status(200).send({success: true, message: 'Produto deletado com sucesso'});
    } 
    catch (error)
    {
        return res.status(500).send({success: false, message: 'Falha ao deletar produto'});
    }
}
