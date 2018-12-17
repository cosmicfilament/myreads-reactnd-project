import React from 'react';
import PropTypes from 'prop-types';
import Book from './book';

// BookList contains and renders the list of books
// this is the point of reuse between the HomePage and SearchPage
const BookList = ({ filteredList }) => {

    return (
        <ol className='books-grid'>
            {filteredList.map((item) => (
                <li key={item.id}>
                    <Book book={item} />
                </li>
            ))}
        </ol>
    );
};

BookList.propTypes = {
    filteredList: PropTypes.array.isRequired
};

export default BookList;
