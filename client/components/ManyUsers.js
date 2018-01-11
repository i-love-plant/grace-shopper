import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const ManyUsers = (props) => {
  const { users } = props

  return (
    <div>
      <h3>Users: </h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
        {
          users.map(user => {
            return (
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.email}</td>
              <td>{user.isAdmin}<td>
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
    users: state.users
  }
}

export default connect(mapState)(ManyUsers)
