import axios from 'axios'

/**
* ACTION TYPES
*/

// for ADMIN users:
const EDIT_ORDER = 'EDIT_ORDER' //will also be able to change order's status(created, processing, completed, cancelled)
// for LOGGEDIN users:
const CREATE_ORDER = 'CREATE_ORDER'
const GET_ORDER = 'GET_ORDER'
const GET_ORDERS = 'GET_ORDERS'


/**
* INITIAL STATE
*/
const defaultOrders = {
  order: {},
  orders:[]
}


/**
* ACTION CREATORS
*/
const getOrder= orderNum => ({type: GET_ORDER, order})
const getOrders = () => ({type: GET_ORDERS, orders})

// export function setSelected(selected) { 
//   return {
//     type: SET_SELECTED,
//     selected
//   }
// }


/**
* THUNK CREATORS
*/
// if user isAdmin they can view all orders, isLogged in can view just their orders, 
// or if not logged in then can't see any orders
export function fetchOrders () {
  return function thunk (dispatch) {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders)
        dispatch(action)
      })
      .catch(err => console.log(err))
    }
  }

// if user isAdmin they can view any order, isLogged in can view just their own order individually, 
// or if not logged in then can't see any orders
export function fetchOrderById () {
  return function thunk (dispatch) {
    return axios.get('/api/orders/:orderId')
      .then(res => res.data)
      .then(orders => {
        const action = getOrders(orders)
        dispatch(action)
      })
      .catch(err => console.log(err))
    }
  }


/**
* REDUCER
*/
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case GET_ORDER:
    // Object.assign({}, state, { products: action.products });
      return action.order
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}



