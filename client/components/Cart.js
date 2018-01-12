"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchCartFromServer,
  removeItemFromCart,
  updateCartQuantitiesOnServer
} from "../store";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.cartProds || [];
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadCartData();
  }

  // handleChange(e, index, newQuantity) {

  //   //we have an array of objects
  //   //want to change the cartQuantity at that index to be the updated quantity
  // }

  render() {
    let cart = this.props.cartProds;
    let cartTotal = this.props.cartTotal;

    const createInvDD = (product, index) => {
      console.log(product.inventory)
      let inventoryArr = [];
      for (let i = 1; i <= product.inventory; i++) {
        inventoryArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
        }
        return (
          <select
            className="form-control"

          >
            {inventoryArr}
          </select>
        );

    };

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
              <td>Remove</td>
            </tr>
            {cart.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} className="product-image" />
                  </td>
                  <td>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </td>
                  <td>${product.price}</td>
                  <td>{createInvDD(product, index)}</td>
                  <td>
                    <button
                      onClick={() => this.props.removeFromCart({ product })}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="total-span">
          <span>TOTAL: ${cartTotal}</span>
        </div>
        <div id="cart-btn-div">
          <button
            className="btn btn-secondary"
            onClick={() => this.props.updateCartQuant(this.state.cart)}
          >
            UPDATE CART
          </button>
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
    },
    removeFromCart(product) {
      dispatch(removeItemFromCart(product));
    },
    updateCartQuant(cart) {
      dispatch(updateCartQuantitiesOnServer(cart));
    }
  };
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
