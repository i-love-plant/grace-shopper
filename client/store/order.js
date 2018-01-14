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
const SET_ORDERPRODUCTS = 'SET_ORDERPRODUCTS'

/**
* INITIAL STATE
*/
const initialOrderState = {
  order: {},
  orders: [],
  orderProducts:[]
}

/**
* ACTION CREATORS
*/
const getOrder= order => ({type: GET_ORDER, order})
const getOrders = orders => ({type: GET_ORDERS, orders})
const setOrders = orderProducts => ({type: SET_ORDERPRODUCTS, orderProducts})

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
export function fetchOrder(orderId) {
  return function thunk (dispatch) {
    return axios.get(`/api/orders/${orderId}`) 
      .then(res => res.data)
      .then(order => {
        const action = getOrder(order)
        dispatch(action)
      })
      .catch(err => console.log(err))
    }
  }

/**
* REDUCER
*/
export default function (state = initialOrderState, action) {
  switch (action.type) {
    case GET_ORDER:
      return Object.assign({}, state, { order: action.order });
    case GET_ORDERS:
      return Object.assign({}, state, { orders: action.orders });


     case SET_ORDERPRODUCTS:
      return Object.assign({}, state, { orderProducts: action.orderProducts });
    default:
      return state
  }
}


