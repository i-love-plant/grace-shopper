import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setProductCategory } from "../store/index"
/**
 * COMPONENT
 */
const ManyProducts = (props) => {

    const categories = props.categories;

    return (
        <div>
            <h3>Products: </h3>

            <select defaultValue={categories.id} name="category" onChange={this.handleCategoryChange}>
                <option value="categories">Select A Category</option>
                {
                    categories.map(category => {
                        return (
                            <option key={category.id} value={category}>{category.name}
                            </option>
                        )
                    })
                }
            </select>

            <table id="products-table">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Price</td>
                        <td>Category</td>
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
                                    <td>{product.price}</td>
                                    <td>
                                        <ul>
                                            {product.categories.map(category => {
                                                return (
                                                    <li key={category.id}>
                                                        {category.name}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </td>
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

const mapDispatch = (dispatch, ownProps) => {
    return {
        handleCategoryChange(event) {
            event.preventDefault();
            dispatch(setProductCategory());

        }
    }
}

export default connect(mapState, mapDispatch)(ManyProducts);
