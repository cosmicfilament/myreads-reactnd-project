import React from 'react';
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

export default BookCover;
