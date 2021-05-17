'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    return await Customer
    //.find({}, 'name email roles');
    .find({});
}

exports.getById = async(id) => {
    return await Customer.findById(id);
}

exports.create = async (data) => {
    const customer = new Customer(data); 
    await customer.save();
}

exports.delete = async(id) => {
    await Customer.findOneAndRemove(id);
}

exports.authenticate = async(data) => {
    return await Customer.findOne({
        email: data.email,
        password: data.password
    });
}