const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {

	content: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			len: [2,300]
		}
	}, 
	rating:{
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0,
			max: 5
		}
	}

})

module.exports = Review