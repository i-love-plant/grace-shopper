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
            <h3>Products: </h3>
            <SearchBar />
            <div className="search-control">
                <select defaultValue={categories.id} name="category" onChange={props.handleCategoryChange}>
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

            <table id="products-table">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td> </td>
                        <td>Price</td>
                    </tr>
                    {
                        props.products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                                    <td>{product.description}</td>
                                    <td>
                                        <img src={product.image} className="product-image" />
                                    </td>
                                    <td>${product.price}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

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
