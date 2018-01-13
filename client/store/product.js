import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_PRODUCT_CATEGORY = 'SET_PRODUCT_CATEGORY';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';


/**
 * INITIAL STATE
 */
const initialProductsState = {
    allProducts: [],
    visibleProducts: [],
    currentProduct: {},
    categories: [],
    selectedCategory: {},
    searchQuery: ''
}

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products});
const getSingleProduct = product => ({type: GET_SINGLE_PRODUCT, product});
const getCategories = categories => ({type: GET_CATEGORIES, categories});
export const setProductCategory = categoryId => ({type: SET_PRODUCT_CATEGORY, categoryId});
export const setSearchQuery = query => ({type: SET_SEARCH_QUERY, query});

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
      return Object.assign({}, state, { allProducts: action.products, visibleProducts: action.products });

    case GET_SINGLE_PRODUCT: {
        return Object.assign({}, state, {currentProduct: action.product });
    }

    case GET_CATEGORIES:
        return Object.assign({}, state, {categories: action.categories });

    case SET_PRODUCT_CATEGORY: {
    // i need to see if the product im looking at, has the category id as one of its categories in its category array
    // first i need to map the array to create an array of the category ids
    // then i need to call indexOf on the array to see if > -1 is returned, if the indexOf that categoryid is greater than -1 then we know that id is in the array of categories thus we can return that product
        
        const selectedCategoryId = +action.categoryId;
        if (selectedCategoryId === -1) {
            return Object.assign({}, state, {selectedCategory: selectedCategoryId, visibleProducts: state.allProducts  });
        }
        const filteredProducts = state.allProducts.filter(product => {
            const categoryIds = product.categories.map(category => {
                return category.id;
                //action.categoryId is the category the user selected
            });
            
            return categoryIds.indexOf(selectedCategoryId) > -1;
        });
        return Object.assign({}, state, {selectedCategory: selectedCategoryId, visibleProducts: filteredProducts  });
    }

    case SET_SEARCH_QUERY:
        return Object.assign({}, state, {searchQuery: action.query });

    default:
      return state
  }
}
