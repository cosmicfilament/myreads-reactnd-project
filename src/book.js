import React, { Component } from 'react';
import BookCover from './bookCover';
import ShelfMultiSelect from './shelfMultiSelect';
import PropTypes from 'prop-types';
import helpers from './helpers';

// a Book encapsulates the jsonData object downloaded from the server
// and exposes it to its child objects
export default class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired
    }

    get image() {
        // make sure that there is an image in the imageLinks.thumbnail
        // property, if not put a dummy page in there.
        const thisBook = this.props.book;
        // make sure the property exists
        if (!helpers.validateObject(thisBook.imageLinks)) {
            thisBook.imageLinks = { 'thumbnail': helpers.defaultImage };
        }
        // make sure this property of imageLinks exists
        if (!helpers.validateString(thisBook['imageLinks'].thumbnail)) {
            thisBook['imageLinks'].thumbnail = helpers.defaultImage;
        }
        return thisBook['imageLinks'].thumbnail;
    }

    get shelf() {
        const thisBook = this.props.book;

        if (!helpers.validateString(thisBook.shelf)) {
            thisBook.shelf = 'none';
        }
        return thisBook.shelf;
    }

    get title() {
        return this.props.book.title;
    }

    get authors() {
        const thisBook = this.props.book;
        thisBook.authors = helpers.validateArray(thisBook.authors) ? thisBook.authors.join(', ') : 'no author listed';
        return thisBook.authors;
    }

    get id() {
        return this.props.book.id;
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <BookCover className="book" image={this.image} />
                    <ShelfMultiSelect className="book-shelf-select" value={this.shelf} book={this.props.book} />
                </div>
                <div className="book-title">{this.title}</div>
                <div className="book-authors">{this.authors}</div>
            </div>
        );
    }
}
