"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCartFromServer } from "../store";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadCartData();
  }

  render() {
    let cart = this.props.cartProds;
    let cartTotal = this.props.cartTotal;

    if (!cart.length) {
      return (
        <div>
          <h2>MY CART</h2>
          <h5>Your cart is empty :(</h5>
          <Link to="/products">
            <p>Go add some stuff!</p>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <h2>MY CART</h2>
        <table id="cart-table">
          <tbody>
            <tr>
              <td> </td>
              <td>Item</td>
              <td>Price</td>
              <td>Quantity</td>
            </tr>
            {cart.map(product => {
              return (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} className="product-image" />
                  </td>
                  <td>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </td>
                  <td>${product.price}</td>
                  <td>{product.cartQuantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <span>TOTAL: ${cartTotal}</span>
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadCartData() {
      dispatch(fetchCartFromServer());
    }
  };
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
