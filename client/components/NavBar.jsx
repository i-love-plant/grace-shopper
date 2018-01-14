import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const NavBar = (props) => {
    const { handleClick, isLoggedIn, isAdmin } = props

    let cartListItem = (
        <li className="nav-item">
            <Link to="/cart">Cart</Link>
        </li>
    )

    let heading = isAdmin ? 'I Love Plant: Admin' : 'I Love Plant';

    return (
        <header id={isAdmin ? "admin-nav": ''}>

            <h1>{heading}</h1>
            {
                isAdmin
                ?
                    <div>
                    <ul id="nav-links">
                        <li className="nav-item">
                            <Link to="/products">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" onClick={handleClick}>Logout</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/account">My Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users">All Users</Link>
                        </li>
                        { cartListItem }
                    </ul>
                    </div>
                :
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
                            <Link to="/account">My Account</Link>
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
        isLoggedIn: !!state.user.id,
        isAdmin: !!state.user.isAdmin
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
