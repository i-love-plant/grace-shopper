'use strict';

const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next)
});

router.delete('/:userId', (req, res, next) => {
      User.destroy({ where: { id: req.params.userId } })
          .then(() => res.status(204))
          .catch(next)
});
