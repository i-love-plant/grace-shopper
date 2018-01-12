import axios from 'axios';

//ACTION TYPES

const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const DELETE_CART = 'DELETE_CART';

//INITIAL STATE

const defaultCart = {cartProds: [], cartTotal: 0};

//ACTION CREATORS

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

const updateCart = cart => {
  return {
    type: UPDATE_CART,
    cart
  }
}

const deleteCart = () => {
  return {
    type: DELETE_CART
  }
}

//THUNK CREATORS

export const fetchCartFromServer = () => {
  return function thunk(dispatch) {
    return axios.get('/api/cart')
    .then(cart => {
      dispatch(getCart(cart))
    })
    .catch(err => console.log(err));
  }
}

export const updateCartOnServer = (productId) => {
  return function thunk(dispatch) {
    return axios.post('/api/cart', {productId})
    .then(cart => {
      dispatch(updateCart(cart))
    })
    .catch(err => console.log(err));
  }
}

export const deleteCartOnServer = () => {
  return function thunk(dispatch) {
    return axios.delete('/api/cart')
    .then(() => {
      dispatch(deleteCart())
    })
    .catch(err => console.log(err));
  }
}

//REDUCER

export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return {cartProds: action.cart, cartTotal: action.cart.reduce((sum, prod) => {
      return sum + (prod.price * prod.cartQuantity);
    },0)}
    case UPDATE_CART:
      return {cartProds: action.cart, cartTotal: action.cart.reduce((sum, prod) => {
      return sum + (prod.price * prod.cartQuantity);
    },0)}
    case DELETE_CART:
      return defaultCart
    default:
      return state
  }
}

