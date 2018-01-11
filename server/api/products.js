'use strict';

const router = require('express').Router();
const { Product } = require('../db/models');
const { isAdmin } = require('../gatekeeper.js');
module.exports = router;

router.get('/', (req, res, next) => {
    Product.findAll({})
        .then(products => res.json(products))
        .catch(next)
});

router.post('/', isAdmin, (req, res, next) => {
    Product.create(req.body)
        .then(newProduct => res.status(201).json(newProduct))
        .catch(next)
});

router.get('/:productId', (req, res, next) => {
    Product.findOne({
        where: {
            id: req.params.productId
        }
    })
        .then(product => res.json(product))
        .catch(next)
});

router.post('/:productId', (req, res, next) => {
    console.log("hello")
    Product.findById(req.params.productId)
        .then(product => {
            console.log("in the promise")
            req.session.cart.products.push(product)
            console.log("UPDATED: ", req.session.cart.products)
            req.session.cart.totalPrice += product.price
            console.log("PRICE: ", req.session.cart.totalPrice)
            return product
        })
        .then(product => res.end())
        .catch(next)
})

router.put('/:productId', isAdmin, (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => product.update(req.body))
        .then(updatedProduct => res.json(updatedProduct))
        .catch(next)
});

router.delete('/:productId', isAdmin, (req, res, next) => {
    Product.destroy({ where: { id: req.params.productId } })
        .then(() => res.status(204))
        .catch(next)
});
