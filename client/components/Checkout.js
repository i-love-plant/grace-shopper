"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cart from './Cart';
import { connect } from "react-redux";
import {deleteCartOnServer} from "../store";

import StripeCheckout from 'react-stripe-checkout';



// Publishable key
// pk_test_XrOXnFf7FJ2AkUns81CnVFLq
// — Jan 14, 2018  
// Secret key
// sk_test_LbSjgTqFQqLjRWjcElwiqPPY
// — Jan 14, 2018  
// Restricted API keys


/*
WILL NEED:
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
    this.state = {email: '', address: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let key = e.target.name;
    let val = e.target.value;
    console.log(this.state);
    this.setState({[key]: val});
  }

  render() {
    //need to capture form data to create order info object
    let orderInfoObj = {};
    return (

    <div>
      <Cart />
      {
        // <div className="form order-form" onSubmit={(evt) => this.props.handleOrderSubmit}>
        //   <div className="form-group">
        //     <label htmlFor="address">SHIPPING ADDRESS</label>
        //     <input className="form-control" name="address" id="addressI" onChange={this.handleChange} value={this.state.address} placeholder="Your address"></input>
        //     <label htmlFor="address">EMAIL</label>
        //     <input className="form-control" name="email" id="emailI" onChange={this.handleChange} value={this.state.email} placeholder="Your email"></input>
        //     <Link to='/checkout/order-success'><button type="submit" className="btn btn-danger">PLACE MY ORDER</button></Link>
        //   </div>
        // </div>
          // <StripeCheckout
          //   name={i love plant}
          //   description={plant}
          //   // amount={} total * 100 for cents
          //   token={onToken(amount, description)}
          //   currency={'USD'}
          //   stripeKey={pk_test_XrOXnFf7FJ2AkUns81CnVFLq}
          // />
 }
    
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

// THUNK HERE: send the shit from form
  // const onToken = (amount, description) => token =>
  // axios.post(http://localhost:8080/checkout,
  //   {
  //     description,
  //     source: token.id,
  //     currency: CURRENCY,
  //     amount: tota
  //   })
  //   .then(successPayment)
  //   .catch(errorPayment);



const mapDispatch = (dispatch, ownProps) => {
  return {
    handleOrderSubmit(info, e) {
      e.preventDefault();
      //also need to dispatch order creation
      dispatch(deleteCartOnServer())
    }

  };
};

const CheckoutContainer = connect(mapState, mapDispatch)(Checkout);

export default CheckoutContainer;
