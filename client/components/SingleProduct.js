import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import {
    fetchProduct,
    updateCartOnServer,
    removeProduct
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
        const isLoggedIn = this.props.isLoggedIn;
        const isAdmin = this.props.isAdmin;

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
        if (product.inventory === 0) {
            cartForm = <div>So Sorry, the {product.name} Is Currently Sold Out</div>;
        } else if (isInCart) {
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
                    <div id="product-name">{product.name}</div>
                    <ul id="single-product-info">
                        <li>
                            <img src={product.image} className="product-image" />
                        </li>
                        <li>${product.price}</li>
                        <li>{product.description}</li>
                    </ul>
                    <ul id="reviews-list">
                        <div id="review-title">Reviews:</div>
                        {
                            this.props.reviews.map(review => {
                                let reviewStars = review.rating === 1 ? `${review.rating} Star` : `${review.rating} Stars`

                                return (
                                    <li key={review.id}> {review.content} {reviewStars}</li>
                                )
                            })
                        }
                    </ul>
                    {
                        isLoggedIn && !isAdmin && //and not is admnin
                        <button type="button" id="add-review">
                            <Link to={`/reviews/new-review/${product.id}`}>
                                Add a Review
                        </Link>
                        </button>
                    }



                </div>

                {
                    isAdmin &&
                    <div id="product-admin-buttons">
                        <button onClick={this.props.handleRemove} type="button" id="delete-product">Delete Product</button>


                        <button type="button" id="edit-product">
                            <Link to={`/products/${product.id}/edit`}>Edit Product</Link>
                        </button>
                    </div>
                }

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
        }),
        isLoggedIn: !!state.user.id,
        isAdmin: !!state.user.isAdmin
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
        },
        handleRemove(event) {
            event.preventDefault();
            const productId = +ownProps.match.params.productId;
            dispatch(removeProduct(productId, ownProps.history));
        }
    };
};

export default withRouter(connect(mapState, mapDispatch)(SingleProduct));
