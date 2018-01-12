import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const NavBar = (props) => {
    const { handleClick, isLoggedIn } = props

    let cartListItem = (
        <li className="nav-item">
            <Link to="/cart">Cart</Link>
        </li>
    )
    return (
        <header>
            <h1>I Love Plant</h1>
            {
                isLoggedIn
                ?
                    <ul id="nav-links">
                        <li className="nav-item">
                            <Link to="/products">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" onClick={handleClick}>Logout</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/home">My Account</Link>
                        </li>
                        { cartListItem }
                    </ul>
                :
                    <ul id="nav-links">
                        <li className="nav-item">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        { cartListItem }
                    </ul>
            }
        </header>
    );
};

const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(NavBar))
