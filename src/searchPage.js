import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookList from './bookList';

// NOTES: The search from BooksAPI is limited to a particular set of search terms.
// You can find these search terms here:
// https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

// However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
// you don't find a specific author or title. Every search is limited by search terms.

// search page reuses the BookList that is also used by the Shelf component for the HomePage
// search is conducted when the user hits 'Enter'
export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        // search query
        this.state = {
            query: this.props.query
        };
        this.clearQuery = this.clearQuery.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
    }

    static propTypes = {
        // search list array
        list: PropTypes.array.isRequired,
        // event handler in app.js that performs the actual search
        OnSearch: PropTypes.func
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }));
    }

    clearQuery = () => {
        this.setState(() => ({
            query: ''
        }));
        this.props.onSearch('Enter', '');
    }

    render() {

        const { query } = this.state;
        const { list, onSearch } = this.props;

        return (
            <div className="search-books" >
                <Link
                    to='/'
                    className="close-search-link">
                    Close
                </Link>
                <div className="search-books-control">
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={query}
                            onKeyUp={(e) => onSearch(e.key, e.target.value)}
                            onChange={(e) => this.updateQuery(e.target.value)}
                            placeholder="Search by title or author"
                        />
                    </div>
                    <div className="search-books-clear-wrapper">
                        <button
                            className="search-books-clear"
                            onClick={(e) => this.clearQuery()}>
                            Clear Search
                        </button>
                    </div>
                </div>
                <div className="search-books-results">
                    <div className="bookshelf" >
                        <h2 className="bookshelf-title">{`Search results for query: ${query}`}</h2>
                        <div className="bookshelf-books">
                            <BookList filteredList={list} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
