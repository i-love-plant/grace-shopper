
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder, fetchOrders} from "../store";
import ReactTable from "react-table";

class SingleOrder extends Component {
  
  componentDidMount() {
        this.props.loadInitialData()
  }

  render() {
    const { orders, order } = this.props
    const data = [order]
    const columns= [  
                {
                  Header: "Order Id",
                  accessor: "id"
                },         
                {
                  Header: "Status",
                  accessor: "orderStatus"
                },
                {
                  Header: "Address",
                  accessor: "address"
                },
                {
                  Header: "Created On",
                  accessor: "createdAt"
                },
                {
                  Header: "Updated On",
                  accessor: "updatedAt"
                }
              ]

    return (
      <div>
        <h3>Order #: {order.id}</h3>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={2}
          minRows={2}
        />
      </div>
    );
  }
};

const mapState = (state) => {
  return {
    order: state.order.order,
    orders: state.order.orders
  }
};

const mapDispatch = (dispatch, ownProps) => {
  var id= +ownProps.match.params.orderId

  return {
          loadInitialData() {
              dispatch(fetchOrder(id))
              dispatch(fetchOrders())
          }
  }
};

const SingleOrderContainer = connect(mapState, mapDispatch)(SingleOrder);

export default SingleOrderContainer;
