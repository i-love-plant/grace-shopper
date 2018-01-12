import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const ManyOrders = (props) => {
  const { orders } = props

  return (
    <div>
      <h3>Orders: </h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
        {// how to get name? Currently showing userId which is a link to user's profile
          orders.map(order => {
            return (
              <div>
                <td><Link to={`/orders/${order.id}`}>{order.id}</Link></td>
                <td><Link to={`/users/${order.userId}`}>{order.userId}</Link></td> 
                <td>{order.orderStatus}</td>
              </div>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    orders: state.order.orders
  }
}


export default connect(mapState)(ManyOrders)
