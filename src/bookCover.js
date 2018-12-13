import React from 'react';

const BookCover = ({ url }) => {
    return (
        // all books have a constant width, height is set to auto in the css
        <div className="book-cover" style={{ backgroundImage: 'url("{url}")' }}></div>
    );
};

export default BookCover;
