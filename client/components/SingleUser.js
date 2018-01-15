import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchOrders } from '../store'
import ManyOrders from './ManyOrders';
import { withRouter, Link } from 'react-router-dom'

// /**
//  * COMPONENT
//  */
class SingleUser extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { name, email, address, orders } = this.props
    return (
      <div>
        <h3>Name: { name }</h3>
        <h5>E-mail: { email }</h5>
        <h5>Address: { address }</h5>
        {/*<table id="users-table">
                <thead>
                  <tr>
                    <th>Order Status</th>
                    <th>Address</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                {
                  orders.map(order => {
                    return (
                      <tr key={order.id}>
                      <td>{order.orderStatus}</td>
                      <td>{order.address}</td>
                      <td>{order.createdAt}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>*/}
              <ManyOrders />
      </div>
    )
  }
}

/**
 * NOTE: /account now displays user's info and past orders
 * - add link functionality: redirect to SingleOrder component
 * - admin orders: displays all users orders instead of admin's orders
 * (perhaps simply change in seed file rather than in fetch request)
 */

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.user.name,
    email: state.user.email,
    address: state.user.address,
    orders: state.order.orders
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchOrders())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleUser))
