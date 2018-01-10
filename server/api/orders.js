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
    if (req.user.isAdmin) {
        Order.findAll()
            .then(users => res.json(users))
            .catch(next)
    } else {
        Order.findAll({
            where: {
                userId: req.user.id
            }
        })
    }
});

router.post('/', (req, res, next) => {
    Order.create(req.body)
        .then(newOrder => res.status(201).json(newOrder))
        .catch(next)
});

router.put('/', isAdmin, (req, res, next) => {
    Order.update(req.body)
        .then(editedOrder => res.json(editedOrder))
        .catch(next)
});

// EXTRA: user can cancel their order (put)
