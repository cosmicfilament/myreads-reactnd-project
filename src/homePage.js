import React from 'react';
import Shelf from './shelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// The HomePage passes the list to each of 3 sections
// with a different query clause for each section
const HomePage = ({ list }) => {

    return (
        <div className="wrapper">
            <div className="list-books-content">
                <div>
                    <Shelf query={'currentlyReading'} list={list} />
                    <Shelf query={'read'} list={list} />
                    <Shelf query={'wantToRead'} list={list} />
                </div>
            </div>
            <div className="open-search">
                <Link
                    to='/SearchPage'
                    className='open-search-link'>
                    Add a book
                    </Link>
            </div>
        </div>
    );
};

HomePage.propTypes = {
    list: PropTypes.array.isRequired
};

export default HomePage;
