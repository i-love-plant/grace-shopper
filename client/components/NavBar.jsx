import React from 'react'
import { Link } from 'react-router-dom';


const NavBar = (props) => {
    const {handleClick, isLoggedIn} = props
    return (
        <header>
            <h1>I Love Plant</h1>
            <ul id="nav-links">
                {
                    isLoggedIn
                        ? <div>
                            {/* The navbar will show these links after you log in */}
                            <li className="nav-item">
                                <Link to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <a href="#" onClick={handleClick}>Logout</a>
                            </li>
                        </div>
                        : <div>
                            {/* The navbar will show these links before you log in */}
                            <li className="nav-item">
                                <Link to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </div>
                }
            </ul>
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
