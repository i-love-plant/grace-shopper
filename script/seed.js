/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Order, Category, Review, Product, OrderItem} = require('../server/db/models')

const users = [
  {email: 'hkwweber@gmail.com',
    name: 'Hannah Weber',
    password: 'plant',
    address: '5 Hanover Square'},
  {email: 'katballo@gmail.com',
    name: 'Kat Ballo',
    password: 'plant',
    address: '5 Hanover Square'},
  {email: 'kathy@kathy.com',
    name: 'Kathy Chun',
    password: 'plant',
    address: '5 Hanover Square'},
  {email: 'ann@heyann.com',
    name: 'Ann Layman',
    password: 'plant',
    address: '5 Times Square',
    isAdmin: true}
];

const products = [
  {name: 'Pothos',
  species: 'Epipremnum aureum',
   price: 10,
   inventory: 12,
   description: 'Easy to care for. Easy to love. Grows quickly.'
    },
    {name: 'Aloe Vera',
    species: 'Aloe barbadensis',
   price: 5,
   inventory: 26,
   description: 'Don\'t eat me but rub me all over yourself.'
    },
   {name: 'Fiddle Leaf Fig',
   species: 'Ficus lyrata',
   price: 500,
   inventory: 9,
   description: 'Guaranteed to die an ugly death within 2 months.'
    },
    {name: 'Rubber Plant',
    species: 'Ficus elastica',
   price: 45,
   inventory: 15,
   description: 'Preetty, pretty good.'
    },
    {name: 'Spider Plant',
    species: 'Chlorophytum comosum',
   price: 25,
   inventory: 41,
   description: 'I will make you look like you have it together.'
    },
    {name: 'Monstera',
    species: 'Monstera deliciosa',
   price: 49,
   inventory: 30,
   description: 'Bloggers love me.'
    },
    {name: 'Majesty Palm',
    species: 'Ravenea rivularis',
   price: 86,
   inventory: 30,
   description: 'Basically I\'m a diva.'
    },
    {name: 'Pencil Cactus',
    species: 'Euphorbia tirucalli ',
   price: 45,
   inventory: 12,
   description: 'I will make you seem more interesting.'
    }
]

const categories = [
  {name: 'Small'},
  {name: 'Medium'},
  {name: 'Large'},
  {name: 'Low Light',
  description: 'Best in non-South facing window. Will also survive in shady corners.'},
  {name: 'Medium Light',
  description: 'Survives in any window, really.'},
  {name: 'High Light',
  description: 'Best in South-facing window.'}
]

const orders = [
  {orderStatus: 'Created', userId: '1', orderEmail: 'a@email.com', orderAddress: '144 prince st'},
  {orderStatus: 'Processing', userId: '2', orderEmail: 'stuff@stuff.com', orderAddress: '144 prince st'},
  {orderStatus: 'Cancelled', userId: '3', orderEmail: 'another@e.com', orderAddress: '144 prince st'},
  {orderStatus: 'Completed', userId: '2', orderEmail: 'business@business.com', orderAddress: '144 prince st'}
]

const reviews = [
  {content: 'I. LOVE. PLANT', rating: 5, productId: 1, userId: 1},
  {content: 'Eat dirt!!!!!!!!', rating: 1, productId: 3, userId: 4},
  {content: 'A good plant', rating: 4, productId: 2, userId: 4},
  {content: 'Ehhh', rating: 2, productId: 2, userId: 3},
  {content: 'My wife is so thrilled with this plant!', rating: 5, productId: 5, userId: 1},
  {content: 'Beautiful', rating: 5, productId: 4, userId: 2},
  {content: 'Could be a better plant', rating: 2, productId: 6, userId: 3},
  {content: 'This website is beautiful wow', rating: 3, productId: 4, userId: 4},
  {content: 'This is a real plant', rating: 4, productId: 3, userId: 3},
  {content: 'Smaller than expected', rating: 4, productId: 7, userId: 2},
  {content: 'Gorgeous!!!', rating: 5, productId: 7, userId: 1}
]

const orderItemData = [
  {priceAtPurchase: 250, quantity: 1, productId: 3, orderId: 1},
  {priceAtPurchase: 5, quantity: 3, productId: 2, orderId: 2},
  {priceAtPurchase: 5, quantity: 1, productId: 1, orderId: 3},
  {priceAtPurchase: 10, quantity: 1, productId: 1, orderId: 4},
  {priceAtPurchase: 4, quantity: 1, productId: 2, orderId: 4}
]

// const productCategoryRel = [
//   {productId: 2, categoryIds: [2,4]},
  // {productId: 2, categoryId: 4},
  // {productId: 2, categoryId: 5},
  // {productId: 2, categoryId: 6},
  // {productId: 1, categoryId: 1},
  // {productId: 1, categoryId: 4},
  // {productId: 1, categoryId: 5},
  // {productId: 3, categoryId: 3},
  // {productId: 3, categoryId: 5},
  // {productId: 3, categoryId: 6}
// ]

// function prodCat (arr) {
//   arr.map(obj => {
//     return Product.findById(obj.productId)
//     .then(foundProduct => {
//       return foundProduct.setCategory({id: 1, name: 'Small'})
//     })
//     .catch(err => console.log(err.stack))
//   })
//  }

function prodCat () {
  return Product.findById(2)
  .then(found => {
    return found.setCategories([2,4,5,6])
    })
  .then(() => {
    return Product.findById(1)
    .then(found2 => {
      return found2.setCategories([1,4,5])
    })
  })
  .then(() => {
    return Product.findById(3)
    .then(found3 => {
      return found3.setCategories([3,5,6])
    })
  })
  .then(() => {
    return Product.findById(4)
    .then(found2 => {
      return found2.setCategories([2,5])
    })
  })
  .then(() => {
    return Product.findById(5)
    .then(found2 => {
      return found2.setCategories([2,5,6])
    })
  })
  .then(() => {
    return Product.findById(6)
    .then(found2 => {
      return found2.setCategories([3,4,5])
    })
  })
  }



const seed = () => {

  return Promise.all(users.map(user => User.create(user))
  )
  .then(() =>
    Promise.all(products.map(product => Product.create(product))
  ))
  .then(() =>
    Promise.all(categories.map(category => Category.create(category))
  ))
  .then(() =>
    Promise.all(orders.map(order => Order.create(order))
  ))
  .then(() =>
    Promise.all(reviews.map(review => Review.create(review))
  ))
  .then(() =>
    Promise.all(orderItemData.map(orderItemEntry => OrderItem.create(orderItemEntry))
  ))
  // .then(() =>
  //   Promise.all(prodCat(productCategoryRel)
  // ))

}


const main = () => {
  console.log('syncing db');
  db.sync({force: true})
  .then(() => {
    console.log('seeding')
    return seed()
  })
  .then(() => {
    return prodCat()
  })
  .catch(err => {
    console.log('Error while seeding')
    console.log(err.stack)
  })
  .then(()=> {
    db.close();
    return null;
  })
}

main();


//OLD CODE FROM BOILERMAKER
// async function seed () {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])
//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message)
//     console.error(err.stack)
//     process.exitCode = 1
//   })
//   .then(() => {
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('seeding...')


