'use strict';

const router = require('express').Router()
const { Product, User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll({})
        .then(products => res.json(products))
        .catch(next)
});

router.post('/', (req, res, next) => {
    if (User.isAdmin) {
        Product.create(req.body)
            .then(newProduct => res.status(201).json(newProduct))
            .catch(next)
    }
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

router.put('/:productId', (req, res, next) => {
    if (User.isAdmin) {
        Product.findById(req.params.productId)
            .then(product => product.update(req.body))
            .then(updatedProduct => res.json(updatedProduct))
            .catch(next)
    }
});

router.delete('/:productId', (req, res, next) => {
    if (User.isAdmin) {
        Product.destroy({ where: { id: req.params.productId } })
            .then(() => res.status(204))
            .catch(next)
    }
});


// think about error handling if the user is not an admin
