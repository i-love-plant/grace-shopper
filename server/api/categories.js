'use strict';

const router = require('express').Router()
const { Category } = require('../db/models')
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
    Category.findAll()
        .then(categories => res.json(categories))
        .catch(next)
});

router.post('/', isAdmin, (req, res, next) => {
	Category.create(req.body)
		.then(newCategory => res.json(newCategory))
		.catch(next)
});

/*
// EXTRA: admin can put (edit) categories, delete categories
router.put('/:categoryId', isAdmin, (req, res, next) => {
    Category.update(req.body)
        .then(editedCategory => res.json(editedCategory))
        .catch(next)
});

router.delete('/:categoryId', isAdmin, (req, res, next) => {
	Category.destroy({ where: { id: req.params.categoryId}})
		.then(() => res.status(204))
		.catch(next)
})
*/

// NOTE: current plan is to filter on the frontend
