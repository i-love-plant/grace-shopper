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
    let cart = this.props.cart;
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
        </ul>
        <div id="cart-btn-div">
          <button className="btn btn-secondary">UPDATE CART</button>
          <Link to='/checkout'><button className="btn btn-primary">CHECKOUT</button></Link>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    cart: state.cart
  };
};

const CartContainer = connect(mapState)(Cart);

export default CartContainer;
