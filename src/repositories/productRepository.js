'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    return await Product
    .find({
        active: true}, 
        'title price slug');
}

exports.getBySlug = async(productSlug) => {
    return await Product.findOne({slug: productSlug});
}

exports.getById = async(id) => {
    return await Product.findById(id);
}

exports.getByTags = async(productTags) => {
    return await Product.find({tags: productTags}, 'title price slug');
}

exports.create = async (data) => {
    const product = new Product(data); 
    await product.save();
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        });
}

exports.delete = async(id) => {
    await Product.findOneAndRemove(id);
}