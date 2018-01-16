import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchUser, deleteUser, updateUser } from '../store'
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
        <button onClick={this.props.handleUpdate}>Promote User to Admin</button>
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
    },
    handleUpdate(event) {
      event.preventDefault();
      const updatedData = { isAdmin: true }
      dispatch(updateUser(+ownProps.match.params.userId, updatedData, ownProps.history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ViewUser))
