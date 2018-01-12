import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialProductsState = {
    products: [],
    currentProduct: null
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

/**
 * THUNK CREATORS
 */

//need to get all products, but also allow for getting all products via filtering through a category

export function fetchProducts() {
    return function thunk(dispatch) { // dispatches action in order to change the state
        return axios.get('/api/products')
            .then(res => res.data)
            .then(products => {
                const action = getProducts(products); // this is the action creator function
                dispatch(action);
            })
            .catch(error => console.log(error));
    };
}



/**
 * REDUCER
 */
export default function (state = initialProductsState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, { products: action.products });

    default:
      return state
  }
}
