"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {} from "../store";


/*
WILL NEED:
cart on the store
when add to cart - need to update store

mapstate ===== give this component state.cart
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
          <Link to='cart/checkout'><button className="btn btn-danger">CHECKOUT</button></Link>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = (dispatch, ownProps) => {
  return {};
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
