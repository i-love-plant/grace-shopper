const User = require('./user')
const Product = require('./product')
const OrderItem = require('./orderItem')
const Category = require('./category');
const Order = require('./order');
const Review = require('./review');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Product.belongsToMany(Category, {through: 'productCategory'});
 Category.belongsToMany(Product, {through: 'productCategory'});

 User.hasMany(Order);
 Order.belongsTo(User);

 User.hasMany(Review);
 Review.belongsTo(User);

 Product.hasMany(Review);
 Review.belongsTo(Product);

 // OrderItem.belongsTo(Product);
 // Product.hasMany(OrderItem);

 // OrderItem.belongsTo(Order);
 // Order.hasMany(OrderItem);

 Order.belongsToMany(Product, {through: OrderItem});
 Product.belongsToMany(Order, {through: OrderItem});

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Category,
  Review,
  Product,
  OrderItem
}
