import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';


/**
 * INITIAL STATE
 */
const initialProductsState = {
    products: [],
    currentProduct: {}
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products});
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product});

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

export function fetchProduct(productId) {
    return function thunk(dispatch) {
        return axios.get(`/api/products/${productId}`)
            .then(res => res.data)
            .then(product => {
                const action = getSingleProduct(product);
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

    case GET_SINGLE_PRODUCT: {
        return Object.assign({}, state, {currentProduct: action.product })
    }

    default:
      return state
  }
}
