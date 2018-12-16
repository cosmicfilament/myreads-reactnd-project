import React, { Component } from 'react';

export default class ShelfMultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }
    // handleChange will also percolate up to the app which will
    // pass this books shelf change and send it back down the chain
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
                    <option value="move">Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}
