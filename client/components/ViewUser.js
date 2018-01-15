import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchUser, deleteUser } from '../store'
import { withRouter, Link } from 'react-router-dom'

/**
 * COMPONENT
 */
class ViewUser extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const user = this.props.currentUser
    return (
      <div>
        <h3>Name: { user.name }</h3>
        <h5>E-mail: { user.email }</h5>
        <h5>Address: { user.address } </h5>
        <button onClick={this.props.handleRemove}>Remove This User</button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      const userThunk = fetchUser(ownProps.match.params.userId)
      dispatch(userThunk)
    },
    handleRemove(event) {
      event.preventDefault();
      dispatch(deleteUser(+ownProps.match.params.userId, ownProps.history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ViewUser))
