import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
 export const SingleUser = (props) => {
  return (
    <div>
      <h3>{ props.name }</h3>
      <h5>E-mail: { props.email }</h5>
      <h5>Address: { props.address }</h5>
      <h5>Past Orders: </h5>
    </div>
  )
}
// export const SingleUser = (props) => {
//   //const { name, email, address, orders } = props
//   return (
//     <div>
//       <h3>{ name }</h3>
//       <h5>email: { email }<h5>
//       <h5>address: { address }<h5>
//       <h5>past orders: <h5>
//       <table>
//         <thead>
//           <tr>
//             <th>Order Status</th>
//             <th>Address</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//         {
//           orders.map(order => {
//             return (
//               <td>{order.orderStatus}</td>
//               <td>{order.address}</td>
//               <td>{order.createdAt}</td>
//             )
//           })
//         }
//         </tbody>
//       </table>
//     </div>
//   )
// }

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    name: state.user.name,
    email: state.user.email,
    address: state.user.address
  }
}

export default connect(mapState)(SingleUser)
