const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  priceAtPurchase: {
   type: Sequelize.FLOAT,
   allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderItem

//order id will be fk from order table
//prod id will be fk from prod table