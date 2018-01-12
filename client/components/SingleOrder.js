"use strict";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {} from "../store";



class SingleOrder extends Component {
  render() {
    
    return (
      <div>
        <h2>ORDER #{some.prop.here}</h2>
     
    {/* steps:
		1. use thunk to search for order. it is filtered on the back end?
		2. once I have order put the order on the state. 
		3. map through the order items


    */}

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

const SingleOrderContainer = connect(mapState, mapDispatch)(SingleOrder);

export default SingleOrderContainer ;
