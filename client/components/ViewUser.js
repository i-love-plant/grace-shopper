import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchUser, deleteUser, updateUser } from '../store'
import { withRouter } from 'react-router-dom'

/**
 * COMPONENT
 */
class ViewUser extends Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    let user = this.props.currentUser
    return (
      <div>
      { (user.name && user.email && user.address) && (user.id === +this.props.urlUserId) &&
      <div>
      <h3>Name: { user.name }</h3>
      <h5>E-mail: { user.email }</h5>
      <h5>Address: { user.address } </h5>
      <button onClick={this.props.handlePassword}>Prompt Password Reset</button>
      <br/>
      { !user.isAdmin &&
        <span>
        <button onClick={this.props.handleRemove}>Remove This User</button>
        <button onClick={this.props.handleUpdate}>Promote User to Admin</button>
        <br/>
        </span>
      }
      <br/>
      <h3>Edit Profile:</h3>
      <form onSubmit={this.props.handleSubmit}>
          <input type="text" defaultValue={`${user.name}`} name="name" placeholder="Name" />
          <br/>
          <input type="text" defaultValue={`${user.email}`} name="email" placeholder="E-mail" />
          <br/>
          <input type="text" defaultValue={`${user.address}`} name= "address" placeholder="Address" />
          <br/>
          <button type="submit">Submit</button>
      </form>
    </div>
    }
    </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    currentUser: state.users.currentUser,
    urlUserId: ownProps.match.params.userId
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    getUser() {
      const userThunk = fetchUser(+ownProps.match.params.userId)
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
    },
    handlePassword(event) {
      event.preventDefault();
      const updatedData = { resetPassword: true }
      dispatch(updateUser(+ownProps.match.params.userId, updatedData, ownProps.history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ViewUser))
