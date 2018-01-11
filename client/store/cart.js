import axios from 'axios';

//ACTION TYPES

const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const DELETE_CART = 'DELETE_CART';

//INITIAL STATE

const defaultCart = [];

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

const deleteCart = cart => {
  return {
    type: DELETE_CART,
    cart
  }
}

//THUNK CREATORS

export const fetchCart = () => {
  return function thunk(dispatch) {
    return axios.get('/api/cart')
  }
}

