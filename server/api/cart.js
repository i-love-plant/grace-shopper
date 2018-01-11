'use strict';

const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;


//to get current cart information
//will use to feed view my cart page
router.get('/', (req, res, next) => {
  res.json(req.session.cart);
})

//to add an item to the cart
//will happen from single product page
// we are getting info from the form via req.body - we need quantity and product id
router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
        .then(product => {
            let cartProduct = product.dataValues;
            cartProduct.cartQuantity = req.body.quantity;
            req.session.cart.push(cartProduct)
            res.end()
        })
        .catch(next)

})

//to edit an item in the cart
//will happen from view my cart page
router.put('/', (req, res, next) => {
  req.session.cart = req.session.cart.map(cartProduct => {
    if (cartProduct.id === req.body.productId) {
      return Object.assign(cartProduct, {cartQuantity: req.body.quantity});
    }
    else return cartProduct;
  })
  .filter(cartProduct => cartProduct.cartQuantity > 0);
  res.json(req.session.cart);

})


//to delete all items from the cart
//will happen when user submits an order (when we'll want to clear cart)
router.delete('/', (req, res, next) => {
  req.session.cart = [];
  res.end();

})
