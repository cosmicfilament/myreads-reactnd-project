import React from 'react';
import PropTypes from 'prop-types';
import Book from './book';

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
}

BookList.propTypes = {
    filteredList: PropTypes.array.isRequired
}

export default BookList;
