"use strict";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { wipeNewOrder } from "../store";

const OrderSuccess = (props) => {
  let orderId = props.orderId;
  return (
    <div>
      <h3>Success! You placed your order.</h3>
      <Link to={`/orders/${orderId}`} onClick={props.handleOrderView}>
        <p>View your order</p>
      </Link>
    </div>
  );
};

const mapState = state => {
  return {
    orderId: state.order.newOrder.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleOrderView() {
      dispatch(wipeNewOrder());
    }
  };
};

const OrderSuccessContainer = connect(mapState, mapDispatch)(OrderSuccess);

export default OrderSuccessContainer;
