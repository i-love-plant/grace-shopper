'use strict';

const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Category.findAll()
        .then(categories => res.json(categories))
        .catch(next)
});

// EXTRA: admin can post new categories, put (edit) categories, delete categories
// NOTE: current plan is to filter on the frontend
