import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

import { fetchOrders, fetchOrderItems, getProducts } from "../store";

export class OrderChart extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    console.log("ORDER ITEMS:   ", this.props.orderItems);
    console.log("PRODUCTS: ", this.props.products);
    console.log("ORDERS!!!", this.props.orders);
    let orderItems = this.props.orderItems;

    //unit sales
    //go through array

    let unitSales = {};
    for (let i = 0; i < orderItems.length; i++) {
      let current = orderItems[i];
      if (unitSales[current.productId]) {
        unitSales[current.productId] += current.quantity;
      } else {
        unitSales[current.productId] = current.quantity;
      }
    }
    console.log("UNIT SALES: ", unitSales);

    //currently: {1:2, 2:4, 3:1}
    let dataArr = [];

    for (var key in unitSales) {
      dataArr.push({ productId: key, sales: unitSales[key] });
    }


    console.log("DATA RR!!!!", dataArr);

    //i want:
    /*
    [{id: 1, sales: 4}, {id: 2, sales: 3}]

    */

    return (
      <div>
        <h1>UNIT SALES</h1>
        <VictoryChart domainPadding={20}>
        <VictoryAxis tickValues={[1,2,3]} tickFormat={["ProductId 1","ProductId 2","ProductId 3"]}/>
        <VictoryAxis dependentAxis tickFormat={(x) => (`${x} units`)}/>
          <VictoryBar data={dataArr} x="productId" y="sales" />
        </VictoryChart>
      </div>
    );
  }
}

const mapState = state => {
  return {
    orders: state.order.orders,
    orderItems: state.orderItem.orderItems,
    products: state.product.allProducts
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(fetchOrderItems());
      dispatch(fetchOrders());
    }
  };
};

const OrderChartContainer = connect(mapState, mapDispatch)(OrderChart);

export default OrderChartContainer;
