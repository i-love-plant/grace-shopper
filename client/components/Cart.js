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
    this.handleChange = this.handleChange.bind(this);
    this.state = {}
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentDidMount() {
    this.props.loadCartData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cartProds.length) {
      let test = nextProps.cartProds.reduce((prev, curr) => {
        prev[curr.id] = curr.cartQuantity;
        return prev;
      },{})
      this.setState(test);
    }
  }

  handleChange(e) {
    let key = e.target.name;
    let val = e.target.value;
    this.props.updateCartQuant({changes: {[key]: val}})

  }

  render() {
    let isInCheckout = this.props.isInCheckout;
    let cart = this.props.cartProds;
    let cartTotal = this.props.cartTotal;

    const createInvDD = (product) => {
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
            name={product.id}
            value={this.state[product.id]}
            onChange={this.handleChange}
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
            {cart.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} className="product-image" />
                  </td>
                  <td>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </td>
                  <td>${product.price}</td>
                  <td>{createInvDD(product)}</td>
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
        {!isInCheckout && (<div id="cart-btn-div">
                  <Link to="/checkout">
                    <button className="btn btn-primary">CHECKOUT</button>
                  </Link>
                </div>)}
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
    updateCartQuant(changes) {
      dispatch(updateCartQuantitiesOnServer(changes));
    }
  };
};

const CartContainer = connect(mapState, mapDispatch)(Cart);

export default CartContainer;
