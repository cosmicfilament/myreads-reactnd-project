import React, { Component } from 'react';
import BookObj from './bookObj';
import BookCover from './bookCover';
import ShelfMultiSelect from './shelfMultiSelect';

export default class Book extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: null
        };
        // use the JSON object retrieved from the server
        // to create a book object which has a subset of
        // the full amount of properties available
        this.setState(() => ({
            book: BookObj.create(this.props.book)
        }));
    }

    // ToDo: Need to be able to change the book shelf and pass that up the chain


    render() {
        const thisBook = this.state.book;

        return (
            <div className="book">
                <div className="book-top">
                    <BookCover className="book-cover" url={thisBook.url} />
                    <ShelfMultiSelect className="book-shelf-select" index={thisBook.getShelfByIndex()} />
                </div>
                <div className="book-title">thisBook.title</div>
                <div className="book-authors">thisBook.authors.toString()</div>
            </div>
        );
    }
}
