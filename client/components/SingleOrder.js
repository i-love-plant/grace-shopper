
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrder, fetchOrders} from "../store";
import ReactTable from "react-table";

class SingleOrder extends Component {

  // constructor(props) {
  //   super(props);
  //   // this.state = { prod }
  // }

  componentDidMount() {
        this.props.loadInitialData()
  }

  render() {
    const { orders, order, orderProducts } = this.props

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


// console.log(this.props)

  // debugger
 // let productData 

 //  order.products && (
 //    productData = Object.assign({}, order.products[0]
 //  )

    // console.log(productData)
 // = Object.assign({}, order.products.name, order.products.id)
  
{order.products &&
  console.log("########- products -############: ", order.products)
  console.log("########- ORDER.products[0] -############: ", orderProducts[0])
  console.log("########- ORDERproducts -############: ", orderProducts)
  // console.log("########- prod data -############: ", productData)
  // console.log("########- ORDER.PRODUCTS -############: ", Object.keys(order.products) )
}



    return (
      <div>
        <h3>Order #: {order.id}</h3>

{ 
  // (order && orders) &&
  //     <ReactTable
  //         data={orderData}
  //         columns={orderColumns}
  //         defaultPageSize={2}
  //         minRows={2}
  //         className="-striped -highlight"
  //         SubComponent={ row => {
            
  //           return (

  //             <div style={{ padding: "20px" }}>
  //               <em>Your order details:</em>
  //               <br />
  //               <ReactTable
  //                 data={productData}
  //                 columns={productColumns}
  //                 defaultPageSize={2}
  //                 minRows={2}
  //                 showPagination={false}
  //               />
  //             </div>
  //           )
  //         }}
  //       />
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

// return {
//          setSelected(obj) { 
//         dispatch( getCampusById(id) )
//          }
//     }

  return {
          loadInitialData() {
              dispatch(fetchOrder(id))
              dispatch(fetchOrders())
          }
  }
};

const SingleOrderContainer = connect(mapState, mapDispatch)(SingleOrder);

export default SingleOrderContainer;
