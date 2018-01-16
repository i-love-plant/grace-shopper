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
  {name: 'POTHOS - EPIPREMNUM AUREUM',
   price: 10,
   inventory: 12,
   description: "The Marble Queen Pothos is a popular plant in the hardy Pothos Family. All members of this group have glossy, heart-shaped, leathery leaves but in different colors. The Golden Pothos is yellow and green, the Jade Pothos is solid green, and the Marble Queen Pothos is green and white. The Marble Queen Pothos, with its long cascading vines, makes a beautiful table or hanging plant. This plant can also be trained to grow on a pole or trellis. A Marble Queen Pothos can survive in low light, but looks better and grows faster in medium to bright light. If the light is too low, the white swirls on the leaves revert to green on the new growth.",
   image: 'images/pothos.jpg'
    },
   {name: 'ALOE VERA - ALOE BARBADENSIS',
   price: 5,
   inventory: 26,
   description: "Aloe Vera Plants can grow in almost any type of soil, but a quick draining well-aerated soil with some sand in it is best for these plants. A commercial Cactus potting soil also works well.  Keep an Aloe Vera Plant in a small pot with drip holes in the bottom. This allows the soil to quickly dry-out and prevents root rot. Although the sap of an Aloe Vera Plant is highly recommended for treating burns, other parts of an Aloe Vera Plant are toxic.",
   image: '/public/images/aloe.jpg'
    },
   {name: 'MONEY TREE - PACHIRA AQUATICA',
   price: 500,
   inventory: 9,
   description: 'Originally came from the wetlands in Central and South America and became very popular in Taiwan in the 1980’s. Pachira aquatica usually has a central trunk made up of three, five, or seven stems that are often braided together.  This plant even does well under fluorescent lights.  A Pachira aquatica likes high humidity. If your home or office is dry, place it on a wet pebble tray to increase the humidity. Be sure the plant is sitting on the peeves and not in the water.  If you want the plant to grow larger, repot as soon as the roots have filled the existing container. Cut off a few of the larger leaves from the bottom of a Money Tree Plant each month to encourage new growth at the top.  The easiest ways to propagate an indoor Money Tree are by stem cuttings.',
   image: '../public/images/money_tree.jpg'
    },
    {name: 'PENCIL CACTUS - EUPHORBIA TIRUCALLI',
   price: 45,
   inventory: 15,
   description: 'Not a cactus plant at all but rather a member of the Euphorbia family, like a Poinsettia. This unique looking plant, native to Africa and India, is also referred to as Indian Tree Spurge, Naked Lady Plant, Aveloz, Milk Bush Plant, and Petroleum Plant.',
   image: '../public/images/pencil_cactus.jpg'
    },
    {name: 'TREE PHILODENDRON - PHILODENDRON SELLOUM',
   price: 25,
   inventory: 41,
   description: 'Native to South America, but also grows outdoors on the East and Gulf coasts of the United States. Indoors, the easy-care, self-heading Philodendron Selloum takes up a lot of space, often spreading 5ft. or more with 2ft.-3ft. leaves. The dark green, shiny leaves are large and deeply lobed. A Selloum does grow a trunk as it matures, but the huge drooping leaves usually hide it. A Philodendron Selloum grows well in bright indirect light. In lower light, the leaves turn a darker green; direct sun or too much light burns or fades the leaves. Propagate a Philodendron Selloum from stem cuttings. Dip the cut end of the stem in a little rooting hormone to increase the chance of success.',
    image: '../public/images/TREE_PHILODENDRON.jpg'
    },
    {name: 'MAJESTY PALM - RAVENEA RIVULARIS',
    price: 85,
    inventory: 30,
    description: 'They are a challenge to take care of and are not very forgiving. Majesty Palms, native to Madagascar, do extremely well in rain forests, swamps, or outdoors in places like Florida. Indoors Majesty Palms often struggle to survive A Majesty Palm needs very bright indirect at all times. One of the reasons the fronds of a Majesty Palm turn yellow is that there is not enough light. A Majesty Palm requires a great deal of fertilizer. Not enough plant food is another reason why a Majesty palm gets yellow leaves. Feed a Majesty Palm every two weeks when the plant is actively growing with a balanced houseplant food at 1/2 the recommended strength.',
    image: '../public/images/majesty_palm.jpg'
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
  {content: 'Eat dirt!!!!!!!!', rating: 1, productId: 3, userId: 4},
  {content: 'A good plant.', rating: 4, productId: 2, userId: 4},
  {content: 'WOW what a plant!', rating: 5, productId: 2, userId: 3}
]

const orderItemData = [
  {priceAtPurchase: 250, quantity: 1, productId: 3, orderId: 1},
  {priceAtPurchase: 5, quantity: 3, productId: 2, orderId: 2},
  {priceAtPurchase: 5, quantity: 1, productId: 1, orderId: 3},
  {priceAtPurchase: 10, quantity: 1, productId: 1, orderId: 4},
  {priceAtPurchase: 4, quantity: 1, productId: 2, orderId: 4}
]

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
