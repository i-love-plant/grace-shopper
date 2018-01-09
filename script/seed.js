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
    address: '5 Hanover Square'},
  {email: 'katballo@gmail.com',
    name: 'Kat Ballo',
    address: '5 Hanover Square'},
  {email: 'kathy@kathy.com',
    name: 'Kathy Chun',
    address: '5 Hanover Square'},
  {email: 'ann@heyann.com',
    name: 'Ann Layman',
    address: '5 Times Square',
    isAdmin: true}
];

const products = [
  {name: 'Pothos',
   price: 10,
   inventory: 237,
   description: 'Easy to care for. Easy to love. Grows quickly.'
    },
    {name: 'Aloe Vera',
   price: 5,
   inventory: 1000,
   description: 'Don\'t eat me but rub me all over yourself.'
    },
   {name: 'Fiddle Leaf Fig',
   price: 500,
   inventory: 85,
   description: 'Guaranteed to die an ugly death within 2 months.'
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
  {orderStatus: 'Created', userId: '1'},
  {orderStatus: 'Processing', userId: '2'},
  {orderStatus: 'Cancelled', userId: '3'},
  {orderStatus: 'Completed', userId: '2'}
]

const reviews = [
  {content: 'I. LOVE. PLANT.', rating: 5, productId: 1, userId: 1},
  {content: 'Eat dirt fiddle leaf fig!!!!!!!!', rating: 1, productId: 3, userId: 4}
]

const orderItemData = [
  {priceAtPurchase: 250, quantity: 1, productId: 3, orderId: 1},
  {priceAtPurchase: 5, quantity: 3, productId: 2, orderId: 2},
  {priceAtPurchase: 5, quantity: 1, productId: 1, orderId: 3},
  {priceAtPurchase: 10, quantity: 1, productId: 1, orderId: 4},
  {priceAtPurchase: 4, quantity: 1, productId: 2, orderId: 4}
]

const productCategoryRelationshipData = [
  {productId: 2, categoryId: 2},
  {productId: 2, categoryId: 4},
  {productId: 2, categoryId: 5},
  {productId: 2, categoryId: 6},
  {productId: 1, categoryId: 1},
  {productId: 1, categoryId: 4},
  {productId: 1, categoryId: 5},
  {productId: 3, categoryId: 3},
  {productId: 3, categoryId: 5},
  {productId: 3, categoryId: 6}
]

const seed = () => {
  Promise.all()
}


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


