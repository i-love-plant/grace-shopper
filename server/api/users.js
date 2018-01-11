'use strict';

const router = require('express').Router()
const { User } = require('../db/models')
const { isAdmin } = require('../gatekeeper.js')
module.exports = router

router.get('/', isAdmin, (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
});

router.delete('/:userId', isAdmin, (req, res, next) => {
  User.destroy({ where: { id: req.params.userId } })
    .then(() => res.status(204))
    .catch(next)
});

// EXTRA: user can delete their account
