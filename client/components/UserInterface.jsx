import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Route, Switch } from 'react-router-dom'
import { logout } from '../store'
import { me } from '../store'
import { Main, Login, Signup, UserHome, NavBar } from './' //how to get to these...
// import { NavBar } from './components/NavBar.jsx'

class UserInterface extends Component {

    componentDidMount() {

        // we need to get all products, sessions, users, orders, load all data in

        // const campusesThunk = fetchCampuses();
        // const studentsThunk = fetchStudents();
    
        // store.dispatch(campusesThunk);
        // store.dispatch(studentsThunk);
    }

    render() {
        const { isLoggedIn } = this.props

        return (
            <div>
                <NavBar />
                <div>
                    <Switch>
                        {/* Routes placed here are available to all visitors */}
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        {
                            isLoggedIn &&
                            <Switch>
                                {/* Routes placed here are only available after logging in */}
                                <Route path="/home" component={UserHome} />
                            </Switch>
                        }
                        {/* Displays our Login component as a fallback */}
                        <Route component={Login} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
      // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
      // Otherwise, state.user will be an empty object, and state.user.id will be falsey
      isLoggedIn: !!state.user.id
    }
  }

  const mapDispatch = (dispatch) => {
    return {
      loadInitialData() {
        dispatch(me())
      }
    }
  }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(UserInterface))



