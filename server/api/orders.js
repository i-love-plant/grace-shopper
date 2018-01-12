'use strict';

const router = require('express').Router()
const { Order, User } = require('../db/models')
const { isAdmin } = require('../gatekeeper.js')
// const { isLoggedIn } = require('../gatekeeper.js')
module.exports = router

router.get('/', (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        Order.findAll()
            .then(orders => res.json(orders))
            .catch(next)
    }
    else if (req.user) {
        Order.findAll({
            where: {
                userId: req.user.id
            }
        })
        .then(orders => res.json(orders))
        .catch(next)
    }
    else {
        const err = new Error('Not authorized')
        err.status = 403
        next(err)
    }
});

// added route so that ADMIN can GET order by ID & so USER can view OWN individual order by ID
router.get('/:orderId', (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        Order.findById(req.params.orderId)
            .then(order => res.json(order))
            .catch(next)
    }
    else if (req.user) {
        const orderIdNum = req.params.orderId
        return Order.findAll({
            where: {
                id: orderIdNum,
                userId: req.user.id
            }
        })
        .then(myOrder => {
            if (myOrder.length !== 0) {res.json(myOrder)}
            else {res.status(404).send("No order by that ID found!")}
        })
        .catch(next)
    }
    else {
        const err = new Error('Not authorized')
        err.status = 403
        next(err)
    }
});


router.post('/', (req, res, next) => {
    Order.create({})
        .then(newOrder => newOrder.setUser(req.user.id))
        .then(newOrder => newOrder.addProduct(req.session.cart))
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
