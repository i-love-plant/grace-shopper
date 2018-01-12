import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProduct } from '../store/index';

/**
 * COMPONENT
 */
class SingleProduct extends Component {

    componentDidMount() {
        this.props.loadProductData();

    }

    render() {

        const product = this.props.productData;

        return (
            <div>
                <h3>{product.name}</h3>
                <ul>
                    <li>{product.description}</li>
                    <li>
                        <img src={product.image} className="product-image" />
                    </li>
                    <li>{product.price}</li>
                </ul>

            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    { console.log("!!!!!!!!!", state) }
    return {

        productData: state.product.currentProduct
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        loadProductData() {
            const productThunk = fetchProduct(ownProps.match.params.productId)
            dispatch(productThunk)
        }
    }
}

export default connect(mapState, mapDispatch)(SingleProduct);
