import React from "react";
import { connect } from "react-redux";
import { updateProduct } from "../store/index";


const SharedProductForm = (props) => {
    const newProduct = props.newProduct;

    //logic to check if new product or editing exisitng

    let product;

    if (newProduct) {
        product = {}
    } else {
        product = props.productData;
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Edit This Product</label>
                Name<input
                    defaultValue={product.name}
                    className="form-control"
                    type="text"
                    name="productName"
                    placeholder="Enter Product Name"
                />
                Price<input
                    defaultValue={product.price} // add $
                    className="form-control"
                    type="text"
                    name="productPrice"
                    placeholder="Enter Product Price"
                />
                Description<textarea
                    defaultValue={product.description}
                    className="form-control"
                    type="text"
                    name="productDescription"
                    placeholder="Enter Product Description"
                />
                Image URL<input
                    defaultValue={product.image}
                    className="form-control"
                    type="text"
                    name="productImage"
                    placeholder="Enter Product Photo URL"
                />
                Inventory<input
                    defaultValue={product.inventory}
                    className="form-control"
                    type="text"
                    name="productInventory"
                    placeholder="Enter Number of Available Products"
                />
            </div>
            <div className="form-group">
            <button>Submit</button>
        </div>
        </form>
    );
}

const mapState = (state, ownProps) => {
    // if (ownProps.newProduct) {
    //     return {};
    // } else {
    //     return {
    //         productData: state.product.allProducts.find(product => {
    //             return product.id === +ownProps.match.params.productId;
    //         })
    //     }
    // }
    return {
        productData: state.product.currentProduct
        // need to actually get the currentProduct again from the state because this wont work if we go directly to this page 
        //productData: state.product.allProducts.find(product => {
        //return product.id === +(ownProps.match.params.productId);
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        handleSubmit(event) {
            event.preventDefault();
            const productData = {
                name: event.target.productName.value,
                price: event.target.productPrice.value,
                description: event.target.productDescription.value,
                image: event.target.productImage.value,
                inventory: event.target.productInventory.value
            };
            if (!ownProps.newProduct) {
            productData.id = ownProps.match.params.productId;
            }
            const history = ownProps.history;
            if (ownProps.newProduct) {
                dispatch(postProduct(productData, history));
            } else {
                dispatch(updateProduct(productData, history));
            }
        }

    }
}


export default connect(mapState, mapDispatch)(SharedProductForm);
