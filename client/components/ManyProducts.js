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
                                    <Link to={`/products/${product.id}`}><img src={product.image} className="product-image" /></Link>
                                </div>
                                <Link className="product-link" to={`/products/${product.id}`}>{product.name}</Link>
                                <div className="product-price">${product.price}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        products: state.product.visibleProducts,
        categories: state.product.categories
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
