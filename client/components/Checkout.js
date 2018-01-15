"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cart from './Cart';
import { connect } from "react-redux";
import {deleteCartOnServer, createOrderOnServer} from "../store";
import StripeCheckout from 'react-stripe-checkout';

class CartCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', address: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({[key]: val});
  }


  onToken (token) {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
// const errorPayment = data => {
//   alert('Payment Error');
// };
// const onToken = (amount, description) => token =>
//   axios.post('http://localhost:8080',
//     {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: amount*100
//     })
//     .then(successPayment)
//     .catch(errorPayment);
  render() {
    //need to capture form data to create order info object
    //need to add: orderEmail, orderAddress, orderToken
    let orderInfoObj = {orderAddress: this.state.address, orderEmail: this.state.email, orderProds: this.props.cartProds, orderTotal: this.props.cartTotal};
    console.log('ORDERINFO', orderInfoObj)

        // FROM POST ORDERS ROUTE:
        // let { orderTotal, orderProds, orderEmail, orderAddress, orderToken } = req.body;
    return (
      <div className="container">
        <Cart isInCheckout='true'/>
        <div className="form order-form" onSubmit={(evt) => this.props.handleOrderSubmit(evt, orderInfoObj)}>
          <div className="form-group">
            <label htmlFor="address">SHIPPING ADDRESS</label>
            <input className="form-control" className="col-xs" name="address" id="addressI" onChange={this.handleChange} value={this.state.address} placeholder="Your address"></input>
            <label htmlFor="address">EMAIL</label>
            <input className="form-control" className="col-xs" name="email" id="emailI" onChange={this.handleChange} value={this.state.email} placeholder="Your email"></input>
          </div>
        </div>

        <StripeCheckout
          name="I LOVE PLANT"
          description= "Buy plant now!"
          image="https://year3french.wikispaces.com/file/view/icon-seedling.png/189935014/icon-seedling.png"
          token={this.onToken}
          stripeKey="pk_test_XrOXnFf7FJ2AkUns81CnVFLq"
        />
      </div>
    )
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
    handleOrderSubmit(e, orderInfo) {
      e.preventDefault();
      dispatch(createOrderOnServer(orderInfo, ownProps.history));
      dispatch(deleteCartOnServer());
    }

  };
};

const CheckoutContainer = connect(mapState, mapDispatch)(CartCheckout);

export default CheckoutContainer;
