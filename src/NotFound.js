import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='not-found-wrapper'>
            <h1>404 Page Not Found</h1>
            <div className='not-found' />
            <Link
                to='/'
                className="not-found-link">
                Home
            </Link>
        </div>
    );
};

export default NotFound;
