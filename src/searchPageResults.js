import React from 'react';
import BookList from './bookList';

const SearchPageResults = ({ title, searchList }) => {

    return (
        <div className="search-books-results">
            <div className="bookshelf" >
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <BookList filteredList={searchList} />
                </div>
            </div>
        </div>
    );
};

export default SearchPageResults;
