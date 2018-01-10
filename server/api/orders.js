'use strict';

const router = require('express').Router()
const { Order, User } = require('../db/models')
module.exports = router

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
    if (!req.user) {
        const err = new Error('Not authorized')
        err.status = 403
        next(err)
    }
    if (req.user.isAdmin) {
        Order.findAll()
            .then(orders => res.json(orders))
            .catch(next)
    } else {
        Order.findAll({
            where: {
                userId: req.user.id
            }
        })
        .then(orders => res.json(orders))
        .catch(next)
    }
});

router.post('/', (req, res, next) => {
    Order.create({})
        .then(newOrder => newOrder.setUser(req.user.id))
        .then(newOrder => newOrder.addProduct(req.session.cart.products))
        .then(newOrder => res.status(201).json(newOrder))
        .catch(next)
});

// testing in Postman without session
// router.post('/', (req, res, next) => {
//     Order.create({})
//         .then(newOrder => newOrder.setUser(1))
//         .then(newOrder => newOrder.addProduct([1,3]))
//         .then(newOrder => res.status(201).json(newOrder))
//         .catch(next)
// });

router.put('/:orderId', isAdmin, (req, res, next) => {
    Order.findById(req.params.orderId)
        .then(order => {
            return order.update(req.body)
        })
        .then(editedOrder => res.json(editedOrder))
        .catch(next)
});

// EXTRA: user can cancel their order (put)
