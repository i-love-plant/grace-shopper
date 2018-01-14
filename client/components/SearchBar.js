import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { setSearchQuery, applySearch, setSuggestions } from '../store';
import Autosuggest from 'react-autosuggest';

// my list to autosuggest is this.props.allProducts 

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);

        
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

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.props.allProducts.filter(product =>
            product.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    onSuggestionsFetchRequested({ value }) {
        const suggestions = this.getSuggestions(value);
        this.props.dispatchSetSuggestions(suggestions)
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
        searchQuery: state.product.searchQuery,
        allProducts: state.product.allProducts,
        searchSuggestions: state.product.searchSuggestions
    }
}

const mapDispatch = (dispatch) => {
    return {
        dispatchSearchQuery(search) {
            dispatch(setSearchQuery(search));
        },
        dispatchApplySearch() {
            dispatch(applySearch());
        },
        dispatchSetSuggestions(suggestions) {
            dispatch(setSuggestions(suggestions));
        }
    }
}

// aux functions

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);


export default withRouter(connect(mapState, mapDispatch)(SearchBar));
