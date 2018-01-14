import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from "../store";
// Import React Table
import ReactTable from "react-table";

/**
 * COMPONENT
 */
export class ManyOrders extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {

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

  const data = this.props.orders

    return (
      <ReactTable
        data={data}
        columns={columns}
      />
    )
  }
}



/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    orders: state.order.orders
  }
};


const mapDispatch = (dispatch, ownProps) => {
 return {
        loadInitialData() {
            // dispatch(fetchOrder())
            dispatch(fetchOrders())
        }
    }
};

const ManyOrdersContainer = connect(mapState, mapDispatch)(ManyOrders);

export default ManyOrdersContainer;
