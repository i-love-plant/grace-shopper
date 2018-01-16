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
        <h3>Edit Profile:</h3>
        <form onSubmit={this.props.handleSubmit}>
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="email" placeholder="E-mail" />
            <input type="text" name= "address" placeholder="Address" />
            <button type="submit">Submit</button>
        </form>
        { !user.isAdmin &&
          <div>
          <button onClick={this.props.handleRemove}>Remove This User</button>
          <button onClick={this.props.handleUpdate}>Promote User to Admin</button>
          </div>
        }
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
    },
    handleSubmit(event) {
      event.preventDefault();
      const updatedData = {
        name: event.target.name.value,
        email: event.target.email.value,
        address: event.target.address.value
      }
      dispatch(updateUser(+ownProps.match.params.userId, updatedData, ownProps.history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ViewUser))
