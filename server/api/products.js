'use strict';

const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        const err = new Error('Not authorized')
        err.status = 403
        next(err)
    }
}

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