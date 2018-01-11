"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cart from './Cart';
import { connect } from "react-redux";
import {} from "../store";

/*
WILL NEED:
keep form changes on local state
on submit =

on order submit:
need to pass this method down in map dispatch to props
need to make a thunk creator and reducer
need to set cart to empty
need to create order

maybe store recent order id on state to be able to store its info and get it on the success page?????
*/



class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {address: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let key = e.target.name;
    let val = e.target.value;
    this.setState({[key]: val});
  }

  render() {
    <div>
    <Cart />
    <div className="form order-form" onSubmit={(evt) => this.props.handleOrderSubmit}>
    <div className="form-group">
    <label htmlFor="address">ADDRESS</label>
    <input className="form-control" name="address" id="addressI" onChange={this.handleChange} value={this.state.address} placeholder="Your address"></input>
    <Link to='cart/checkout/order-success'><button type="submit" className="btn btn-primary">PLACE MY ORDER</button></Link>
    </div>
    </div>
    </div>

  }
}

const mapState = state => {
  return {};
};

const mapDispatch = (dispatch, ownProps) => {
  return {};
};

const CheckoutContainer = connect(mapState, mapDispatch)(Checkout);

export default CheckoutContainer;
