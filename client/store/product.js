import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_PRODUCT_CATEGORY = 'SET_PRODUCT_CATEGORY';


/**
 * INITIAL STATE
 */
const initialProductsState = {
    products: [],
    currentProduct: {},
    categories: [],
    selectedCategory: {},
    visibleProducts: []
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products});
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product});
const getCategories = categories => ({type: GET_CATEGORIES, categories});
const setProductCategory = categoryId => ({type: SET_PRODUCT_CATEGORY, categoryId});

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

export function fetchCategories() {
    return function thunk(dispatch) {
        return axios.get('/api/categories')
            .then(res => res.data)
            .then(categories => {
                const action = getCategories(categories);
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

    case GET_CATEGORIES:
        return Object.assign({}, state, {categories: action.categories })

    case SET_PRODUCT_CATEGORY: {
    //update the state based off that category id, setting the selected category and setting the visible products all at once
    // need to update the visible products based on the products that are in that category
        const filteredProducts = state.products.filter(product => product.category.id === action.categoryId);
        return Object.assign({}, state, {selectedCategory: action.categoryId, visibleProducts: filteredProducts  })
    }
    default:
      return state
  }
}
