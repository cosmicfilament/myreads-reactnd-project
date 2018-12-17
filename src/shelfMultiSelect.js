import React, { Component } from 'react';
import PropTypes from 'prop-types';

// ShelfMultiSelect renders the option Select Control that allows the
// user to move the book to another shelf.
// App.js subscribes to the select control's onChange event and updates
// the state of the book item which percolates back down to the child components.
export default class ShelfMultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    static propTypes = {
        // the id is used in the onChange event to identify the book
        id: PropTypes.string.isRequired,
        // event handler in app.js that listens for this event
        // and updates the state of the correct book
        handleChange: PropTypes.func
    }

    handleChange(value) {
        this.setState(() => ({
            value: value
        }));
    }

    render() {

        const { value } = this.state;
        const { id } = this.props;
        const handleChange = this.handleChange;

        return (
            <div className="book-shelf-selector" >
                <select
                    onChange={(e) => handleChange(e.target.value)}
                    value={value}
                    id={id}
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
