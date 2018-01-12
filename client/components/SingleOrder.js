
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder, fetchOrders} from "../store";



class SingleOrder extends Component {
  
  componentDidMount() {
        this.props.loadInitialData()
    }


  render() {
     const { orders, order } = this.props

    return (
      <div>
        <h3>Order #:{"some.prop.here"}</h3>
     
      {/* steps:
  		1. use thunk to search for order. it is filtered on the back end?
  		2. once I have order put the order on the state. 
  		3. map through the order items
 <td><Link to={`api/orders/${order.id}`}>{order.id}</Link></td>

      */}

        </div>
    );
  }
};

const mapState = state => {
  return {
    order: state.order.order,
    orders: state.order.orders
  }
};

const mapDispatch = (dispatch, ownProps) => {
 return {
        loadInitialData() {
            dispatch(fetchOrder())
            dispatch(fetchOrders())
        }
    }
};

const SingleOrderContainer = connect(mapState, mapDispatch)(SingleOrder);

export default SingleOrderContainer;
