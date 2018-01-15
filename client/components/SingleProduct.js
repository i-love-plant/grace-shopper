import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import {
    fetchProduct,
    updateCartOnServer
} from "../store/index";

/**
 * COMPONENT
 */
class SingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { quantity: 1 };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.loadProductData();
    }

    handleChange(e) {
        let key = e.target.name;
        let val = e.target.value;
        this.setState({ [key]: val });
    }

    render() {
        const product = this.props.productData;

        //getting inventory array for dropdown menu:
        let inventoryArr = [];
        for (let i = 1; i <= product.inventory; i++) {
            inventoryArr.push(
                <option key={i} value={i}>
                    {i}
                </option>
            );
        }

        let cartProds = this.props.cartProds;
        let isInCart = cartProds.find(item => {
            return item.id === product.id;
        });

        let cartForm;
        if (isInCart) {
            cartForm = (
                <div>
                    <p>Pssst, already in your cart.</p>
                    <Link to="/cart">
                        {}
                        <button type="submit" className="btn btn-primary">
                            SEE MY CART
          </button>
                    </Link>
                </div>
            );
        } else {
            cartForm = (
                <form className="form order-form">
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <select
                            disabled={isInCart}
                            className="form-control"
                            id="quantityI"
                            name="quantity"
                            onChange={this.handleChange}
                            value={this.state.quantity}
                        >
                            {inventoryArr}
                        </select>
                    </div>
                    <Link to="/cart">
                        {}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={evt =>
                                this.props.handleAddToCart(evt, {
                                    productId: product.id,
                                    quantity: +this.state.quantity
                                })
                            }
                        >
                            ADD TO CART
            </button>
                    </Link>
                </form>
            );
        }

        return (
            <div>
                <div>
                    <h3>{product.name}</h3>
                    <ul>
                        <li>
                            <img src={product.image} className="product-image" />
                        </li>
                        <li>{product.description}</li>
                        <li>${product.price}</li>
                    </ul>
                    <ul>Reviews:
            {
                            this.props.reviews.map(review => {
                                return (
                                    <li key={review.id}> {review.content} {review.rating} Stars</li>
                                )
                            })
                        }
                    </ul>
                    <button type="button" id="add-review">
                        <Link to={`/reviews/new-review/${product.id}`}>
                            Add a Review
                        </Link>
                    </button>
                </div>
                {cartForm}
            </div>
        );
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        productData: state.product.currentProduct,
        cartProds: state.cart.cartProds, 
        reviews: state.review.allReviews.filter(review => {
            return review.productId === state.product.currentProduct.id;
        })
    };
};

const mapDispatch = (dispatch, ownProps) => {
    return {
        loadProductData() {
            const productThunk = fetchProduct(ownProps.match.params.productId);
            dispatch(productThunk);
        },
        handleAddToCart(evt, prodInfo) {
            dispatch(updateCartOnServer(prodInfo));
        }
    };
};

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));
