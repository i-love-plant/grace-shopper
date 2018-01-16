import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setProductCategory } from '../store'
import SearchBar from './SearchBar'

/**
 * COMPONENT
 */
const ManyProducts = (props) => {
    const categories = props.categories;


    const isAdmin = props.isAdmin;

    return (
        <div>
            <h1>Lovely Plants For Purchase</h1>
            <div id="search-controls">
                <SearchBar />
                <div className="search-control">
                    <select id="category-select" defaultValue={categories.id} name="category" onChange={props.handleCategoryChange}>
                        <option value="-1">Select A Category</option>
                        {
                            categories.map(category => {
                                return (
                                    <option key={category.id} value={category.id}>{category.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            <div id="products-grid">
                {
                    props.products.map(product => {
                        return (
                            <div key={product.id} className="product-square">
                                <div>
                                    <img src={product.image} className="product-image" />
                                </div>
                                <Link to={`/products/${product.id}`}>{product.name}</Link>
                                <div className="product-price">${product.price}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            {
                isAdmin &&
                <button type="button" id="add-product-button">
                            <Link to={`/products/add`}>
                                Add a Product
                        </Link>
                        </button>
            }
        </div>
    );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        products: state.product.visibleProducts,
        categories: state.product.categories,
        isAdmin: !!state.user.isAdmin
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleCategoryChange(event) {
            //event.preventDefault();
            dispatch(setProductCategory(event.target.value));

        }
    }
}

export default connect(mapState, mapDispatch)(ManyProducts);
