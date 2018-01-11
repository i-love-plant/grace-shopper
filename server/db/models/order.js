const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
	orderStatus: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'Created',
		validate: {
			isIn: [['Created', 'Processing', 'Cancelled', 'Completed']]
		}
	},
  address: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Order
