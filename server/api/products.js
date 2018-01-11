'use strict';

const router = require('express').Router();
const { Product, Category } = require('../db/models');
const { isAdmin } = require('../gatekeeper.js');
module.exports = router;

router.get('/', (req, res, next) => {
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

// ---------------OLD ROUTE FOR ADDING TO CART TO BE DELETED SOON---------------
// this route (api/products/:productId) adds an object to the cart
// we still need a way to add quantity of items to cart
// req.params.quantity --->from a FORM 
// router.post('/:productId', (req, res, next) => {
//     Product.findById(req.params.productId)
//         .then(product => {
//             req.session.cart.push(product)
//             res.end()
//         })
//         .catch(next)
// })
// ---------------OLD ROUTE FOR ADDING TO CART TO BE DELETED SOON---------------


// assuming we have a FORM on the individual product page. 
// we are getting info from the form via req.body
router.post('/add', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            product.quantity = req.body.quantity
            req.session.cart.push(product)
            res.end()
        })
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
