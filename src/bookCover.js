import React from 'react';
import PropTypes from 'prop-types';
import helpers from './helpers';

const BookCover = ({ image }) => {

    return (
        <div className="book-cover" style={{
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            width: helpers.imageWidth,
            height: '100%',
            backgroundImage: `url("${image}")`
        }}
        />
    );
};

// an image is not required as some book
// objects are missing a book image
BookCover.propTypes = {
    image: PropTypes.string
};

export default BookCover;
