import React from 'react';
import Shelf from './shelf';
import { Link } from 'react-router-dom';

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

export default HomePage;
