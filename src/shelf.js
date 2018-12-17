import React from 'react';
import PropTypes from 'prop-types';
import BookList from './bookList';
import helpers from './helpers';

// a shelf is where the list is filtered to a particular shelf
const Shelf = ({ query, list }) => {

    const thisList = list.filter(item => item.shelf === query);

    return (
        <div className="bookshelf" >
            <h2 className="bookshelf-title">{helpers.shelves[query]}</h2>
            <div className="bookshelf-books">
                <BookList filteredList={thisList} />
            </div>
        </div>
    );
};

Shelf.propTypes = {
    list: PropTypes.array.isRequired,
    query: PropTypes.string.isRequired
};

export default Shelf;
