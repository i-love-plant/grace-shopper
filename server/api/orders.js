'use strict';

const router = require('express').Router()
const { Order, User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    if (User.isAdmin) {
        Order.findAll()
            .then(users => res.json(users))
            .catch(next)
    } else {
        Order.findAll({
            where: {
                userId: User.id
            }
        })
    }
});
