
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder, fetchOrders} from "../store";
import ReactTable from "react-table";

class SingleOrder extends Component {

  componentDidMount() {
        this.props.loadInitialData()
  }

  render() {
    const { orders, order } = this.props
    let initialProductData =  order.products? Object.assign( [], order.products): false
    
    let productData =  (order.products && initialProductData)? 
        initialProductData.map((prodObj)=>{
          return Object.assign({}, prodObj, {priceAtPurchase: prodObj.orderItem.priceAtPurchase}, {quantity:prodObj.orderItem.quantity} )
        })
        : false

    const orderData = [order]
    const orderColumns= [  
                {
                  Header: "Order Id",
                  accessor: "id"
                },         
                {
                  Header: "Status",
                  accessor: "orderStatus"
                },
                {
                  Header: "Address",
                  accessor: "address"
                },
                {
                  Header: "Created On",
                  accessor: "createdAt"
                },
                {
                  Header: "Updated On",
                  accessor: "updatedAt"
                }
              ]

  // if (order.products && initialProductData) {
  //     const productData = initialProductData.map((prodObj)=>{
  //       return Object.assign({}, prodObj, {priceAtPurchase: prodObj.orderItem.priceAtPurchase}, {quantity:prodObj.orderItem.quantity} )
  //     })
  // } 
  // console.log("########- orderItem -############: ", order.products)
  // (const productData = order.products[0].orderItem)
  // productData = Object.assign( [], order.products)
  // console.log(productData)
  
  

  const productColumns= [  
                {
                  Header: "Item Name",
                  accessor: "name"
                },         
                {
                  Header: "Purchase Price",
                  accessor: "priceAtPurchase"
                },
                {
                  Header: "Quantity",
                  accessor: "quantity"
                },
                {
                  Header: "Pic",
                  accessor: "image"
                }
              ]

    return (
      <div>
        <h3>Order #: {order.id}</h3>

{ 
  (order && productData) &&
      <ReactTable
          data={orderData}
          columns={orderColumns}
          defaultPageSize={2}
          minRows={2}
          className="-striped -highlight"
          SubComponent={ row => {
            
            return (

              <div style={{ padding: "20px" }}>
                <em>Your order details:</em>
                <br />
                <ReactTable
                  data={productData}
                  columns={productColumns}
                  defaultPageSize={2}
                  minRows={2}
                  showPagination={false}
                />
              </div>
            )
          }}
        />
}
       
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    order: state.order.order,
    orders: state.order.orders,
    orderProducts: state.order.orders.products
  }
};

const mapDispatch = (dispatch, ownProps) => {
  var id= +ownProps.match.params.orderId

  return {
          loadInitialData() {
              dispatch(fetchOrder(id))
              dispatch(fetchOrders())
          }
  }
};

const SingleOrderContainer = connect(mapState, mapDispatch)(SingleOrder);

export default SingleOrderContainer;
