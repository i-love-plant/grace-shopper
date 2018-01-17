import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchOrders } from '../store'
import ManyOrders from './ManyOrders';
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
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
        <ManyOrders />
      </div>
    )
  }
}

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
