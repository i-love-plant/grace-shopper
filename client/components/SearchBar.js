import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { setSearchQuery, applySearch } from '../store';

class SearchBar extends Component {
    constructor(props){
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearch(event) {
        event.preventDefault();
        const query = event.target.searchBar.value;
        this.props.history.push(`/products?query=${query}`);
        this.props.dispatchApplySearch();
    }

    handleSearchChange(event) {
        //already watching the input so we can go directly to the value
        const query = event.target.value;
        this.props.dispatchSearchQuery(query);
    }

    render() {
        const { isLoggedIn, isAdmin } = this.props
        return (
            <div>
                <form onSubmit={this.handleSearch} id="search-form" className="form-group" style={{ marginTop: '20px' }}>
                    <input
                        onChange={this.handleSearchChange}
                        name="searchBar"
                        value={this.props.searchQuery}
                        // className='form-control'
                        placeholder="Search For A Product"
                    />
                </form>
                <button type="submit" form="search-form">Search</button>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        searchQuery: state.product.searchQuery
    }
}

const mapDispatch = (dispatch) => {
    return {
        dispatchSearchQuery(search) {
            dispatch(setSearchQuery(search));
        },
        dispatchApplySearch() {
            dispatch(applySearch());
        }
    }
}


export default withRouter(connect(mapState, mapDispatch)(SearchBar));
