import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct, updateCartOnServer } from "../store/index";

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
        </div>
        <form
          className="form order-form"
        >
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <select
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
            <button type="submit" className="btn btn-primary" onClick={evt => this.props.handleAddToCart(evt, {productId: product.id, quantity: +this.state.quantity})}>
              ADD TO CART
            </button>
            </Link>
          </form>
        </div>

    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    productData: state.product.currentProduct
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadProductData() {
      const productThunk = fetchProduct(ownProps.match.params.productId);
      dispatch(productThunk);
    },
    handleAddToCart(evt,prodInfo) {
      // evt.preventDefault();
      dispatch(updateCartOnServer(prodInfo))
    }
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
