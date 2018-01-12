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
    // we need to get all users
  }

  render() {
  return (
    <div>
      <h3>Users: </h3>
      <table id="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.users.map(user => {
            return (
              <tr key={user.id}>
              <td><Link to={`/users/:{user.id}`}>{user.name}</Link></td>
              <td>{user.email}</td>
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
