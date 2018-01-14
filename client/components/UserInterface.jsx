import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Route, Switch } from 'react-router-dom'
import { me, fetchProducts, fetchCategories, setSearchQuery } from '../store'
import { Login, Signup, UserHome, NavBar } from './' //how to get to these...
import ManyProducts from './ManyProducts';
// import { NavBar } from './components/NavBar.jsx'
import OrderSuccess from './OrderSuccess';
import Cart from './Cart';
import Checkout from './Checkout';
import ManyUsers from './ManyUsers';
import SingleUser from './SingleUser';
import SingleProduct from './SingleProduct';
import SingleOrder from './SingleOrder';
import ManyOrders from './ManyOrders';
//import { URLSearchParams } from 'url';

class UserInterface extends Component {

    componentDidMount() {
        this.props.loadInitialData()
        const params = new URLSearchParams(this.props.location.search);
        if (params.has('query')) {
            this.props.dispatchSearchQuery(params.get('query')) //this method gets whatever follows query in the url
        }
    }

    render() {
        const { isLoggedIn, isAdmin } = this.props

        return (
            <div>
                <NavBar />
                <main>
                    <Switch>
                        <Route exact path="/" component={ManyProducts} />
                        <Route exact path="/products" component={ManyProducts} />
                        <Route exact path="/products/:productId" component={SingleProduct} />
                        {/* Routes placed here are available to all visitors */}
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/checkout" component={Checkout} />
                        <Route path="/checkout/order-success" component={OrderSuccess} />
                        {/* Routes placed here are only available if user is an admin */}
                        {
                            isAdmin &&
                            <Switch>
                                <Route path="/home" component={ManyProducts} />
                                <Route exact path="/account" component={SingleUser} />
                                <Route exact path="/orders" component={ManyOrders} />
                                <Route path="/orders/:orderId" component={SingleOrder} />
                                <Route exact path="/users" component={ManyUsers} />
                            </Switch>
                        }
                        {
                            isLoggedIn &&
                            <Switch>
                                {/* Routes placed here are only available after logging in */}
                                <Route path="/home" component={ManyProducts} />
                                <Route exact path="/account" component={SingleUser} />
                                <Route exact path="/orders" component={ManyOrders} />
                                {/* <Route path="/orders/:orderId" component={SingleOrder} />*/}
                                {/* Routes placed here are only available if user is an admin */}
                                {
                                    isAdmin &&
                                        <Switch>
                                            <Route exact path="/users" component={ManyUsers} />
                                        </Switch>
                                }

                            </Switch>
                        }
                        {/* Displays our Login component as a fallback */}
                        <Route component={Login} />

                    </Switch>
                </main>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
        // Otherwise, state.user will be an empty object, and state.user.id will be falsey
        isLoggedIn: !!state.user.id,
        isAdmin: !!state.user.isAdmin
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(me())
            dispatch(fetchProducts())
            dispatch(fetchCategories())
        },
        dispatchSearchQuery(search) {
            dispatch(setSearchQuery(search));
        }
    }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
// export default withRouter(connect(mapState, mapDispatch)(UserInterface))


export default withRouter(connect(mapState, mapDispatch)(UserInterface))

