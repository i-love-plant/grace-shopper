import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrders} from "../store";
/**
 * COMPONENT
 */
export class ManyOrders extends Component {


  componentDidMount() {
        this.props.loadInitialData()
  }

  render(){
  const { orders } = this.props

  console.log("THIS IS this.props.orders: ", orders) //empty array []... 

    return (
      <div>
        <h3>Orders: </h3>

        <table id="orders-table">
          <thead>
            <tr>
              <th>ID </th>
              <th>User </th>
              <th>Order Status</th>
            </tr>
          </thead>

          <tbody>
          {// how to get name? Currently showing userId which is a link to user's profile
            // orders && orders.map(order => {
            //   return (
            //     <div>
            //       <td><Link to={`/orders/`}>{order.id}</Link></td>
            //       <td><Link to={`/users/${order.userId}`}>{order.userId}</Link></td> 
            //       <td>{order.orderStatus}</td>
            //     </div>
            //   )
            // })
          }
          </tbody>
        </table>
      </div>
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