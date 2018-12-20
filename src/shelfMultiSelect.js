import React, { Component } from 'react';
import PropTypes from 'prop-types';

// ShelfMultiSelect renders the option Select Control that allows the
// user to move the book to another shelf.
// App.js subscribes to the select control's onChange event and updates
// the state of the book item which percolates back down to the child components.
export default class ShelfMultiSelect extends Component {

    state = { value: this.props.value }

    static propTypes = {
        // the id is used in the onChange event to identify the book
        book: PropTypes.object.isRequired,
        // event handler in app.js that listens for this event
        // and updates the state of the correct book
        handleChange: PropTypes.func
    }

    handleChange = (value) => {
        this.setState({ value: value });
    }

    render() {

        const { value } = this.state;
        const { book } = this.props;
        const handleChange = this.handleChange;

        return (
            <div className="book-shelf-selector" >
                <select
                    onChange={(e) => handleChange()}
                    value={value}
                    slot={JSON.stringify(book)}
                    name={'book-shelf-selector'}
                >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}
