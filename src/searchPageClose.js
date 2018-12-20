import React from 'react';
import { Link } from 'react-router-dom';

const SearchPageClose = () => {
    return (
        <Link
            to='/'
            className="close-search-link">
            Close
        </Link>
    );
};

export default SearchPageClose;
