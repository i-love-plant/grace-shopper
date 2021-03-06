import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchUsers } from '../store'
import { withRouter, Link } from 'react-router-dom'

/**
 * COMPONENT
 */
class ManyUsers extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <div>
        <h3>Users: </h3>
        <table id="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Admin</th>
              <th>Password Reset Prompted</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.users.map(user => {
              return (
                <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>View Profile</Link></td>
                <td>{user.name || user.email}</td>
                <td>{user.email}</td>
                <td>{`${user.isAdmin}`}</td>
                <td>{`${user.resetPassword}`}</td>
                </tr>
              )
            })
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
    users: state.users.users
  }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(fetchUsers())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(ManyUsers))
