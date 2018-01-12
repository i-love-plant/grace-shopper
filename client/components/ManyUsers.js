import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const ManyUsers = (props) => {
  return (
    <div>
      <h3>Users: </h3>
      <table id="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
        {
          props.users.map(user => {
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

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    users: state.users.users
  }
}

export default connect(mapState)(ManyUsers)
