"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {} from "../store";

/*
WILL NEED:
when add to cart - need to update store
*/

class Cart extends Component {
  render() {
    let cart = this.props.cartProds;
    let cartTotal = this.props.cartTotal;

    // let cart = [
    // {
    //     "id": 1,
    //     "name": "Aloe Vera",
    //     "description": "Don't eat me but rub me all over yourself.",
    //     "image": "https://i.imgur.com/pBjJBKK.jpg",
    //     "price": 5,
    //     "inventory": 1000,
    //     "createdAt": "2018-01-10T20:00:11.016Z",
    //     "updatedAt": "2018-01-10T20:00:11.016Z",
    //     "cartQuantity": 1
    // },
    // {
    //     "id": 2,
    //     "name": "Fiddle Leaf Fig",
    //     "description": "Guaranteed to die an ugly death within 2 months.",
    //     "image": "https://i.imgur.com/pBjJBKK.jpg",
    //     "price": 500,
    //     "inventory": 85,
    //     "createdAt": "2018-01-10T20:00:11.016Z",
    //     "updatedAt": "2018-01-10T20:00:11.016Z",
    //     "cartQuantity": 11
    // }
    // ]

    if (!cart.length) {
      return (
        <div>
          <h2>MY CART</h2>
          <h5>Your cart is empty :(</h5>
          <Link to='/products'>
          <p>Go add some stuff!</p>
          </Link>
        </div>
      );
    }

    // let cartTotal = cart.reduce((sum, prod) => {
    //   return sum + (prod.price * prod.cartQuantity);
    // },0)
    console.log('total: ',cartTotal);

    return (
      <div>
        <h2>MY CART</h2>
        <ul>
          {cart.map(product => {
            return (
              <li key={product.id}>
                {product.name} Quantity: {product.cartQuantity}
              </li>
            );
          })}
          <li>TOTAL: {cartTotal}</li>
        </ul>

        <div id="cart-btn-div">
          <button className="btn btn-secondary">UPDATE CART</button>
          <Link to="/checkout">
            <button className="btn btn-primary">CHECKOUT</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    cartProds: state.cart.cartProds,
    cartTotal: state.cart.cartTotal
  };
};

const CartContainer = connect(mapState)(Cart);

export default CartContainer;
