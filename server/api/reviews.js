'use strict';

const router = require('express').Router();
const { Review } = require('../db/models');
const { isAdmin } = require('../gatekeeper.js');
module.exports = router;


router.get('/', isAdmin, (req, res, next) => {
    Review.findAll()
      .then(reviews => res.json(reviews))
      .catch(next)
  });


// will need to only allow loggedin users to post a review
router.post('/', (req, res, next) => {
    Review.create(req.body)
    .then(newReview => res.status(201).json(newReview))
    .catch(next)
});

