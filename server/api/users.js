'use strict';

const router = require('express').Router()
const { User } = require('../db/models')
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
