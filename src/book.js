import React, { Component } from 'react';
import BookCover from './bookCover';
import ShelfMultiSelect from './shelfMultiSelect';
import PropTypes from 'prop-types';

// a Book encapsulates the jsonData object downloaded from the server
// and exposes it to its child objects
export default class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired
    }

    get image() {
        return this.props.book['imageLinks'].thumbnail;
    }

    get shelf() {
        return this.props.book.shelf;
    }

    get title() {
        return this.props.book.title;
    }

    get authors() {
        return this.props.book.authors.toString();
    }

    get id() {
        return this.props.book.id;
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <BookCover className="book" image={this.image} />
                    <ShelfMultiSelect className="book-shelf-select" value={this.shelf} id={this.id} />
                </div>
                <div className="book-title">{this.title}</div>
                <div className="book-authors">{this.authors}</div>
            </div>
        );
    }
}
