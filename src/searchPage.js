import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookList from './bookList';

// NOTES: The search from BooksAPI is limited to a particular set of search terms.
// You can find these search terms here:
// https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

// However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
// you don't find a specific author or title. Every search is limited by search terms.

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.updateQuery = this.updateQuery.bind(this);
    }

    static propTypes = {
        list: PropTypes.array.isRequired,
        OnSearch: PropTypes.func
    }

    state = {
        query: '',
    };

    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }));
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
