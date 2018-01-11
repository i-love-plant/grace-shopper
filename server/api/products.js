'use strict';

const router = require('express').Router();
const { Product, Category } = require('../db/models');
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

router.get('/:', (req, res, next) => {
    let filter = {};
    if ("category" in req.query) {
        const category = +req.query.category;

        // basically does WHERE product.category.id = category
        filter = {
            include: [{
                model: Category,
                through: {
                    where: {
                        categoryId: category
                    }
                },
                required: true
            }]
        }
    } 
    Product.findAll(filter)
    .then(products => {
        res.json(products)
    })
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
