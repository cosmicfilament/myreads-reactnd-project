import React, { Component } from 'react';

export default class ShelfMultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // selected is the index value of the selected option
            selected: this.props.index
        };
        // handle to the select control
        this.selector = null;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.selector.selectedIndex = this.state.selected;
    }

    handleChange(event) {
        event.preventDefault();
        this.setState(() => ({
            selected: event.target.selectedIndex
        }));
    }

    // ToDo: implement Move to .... functionality

    render() {
        return (
            <div className="book-shelf-selector" >
                <select
                    ref={select => this.selector = select}
                    onChange={this.handleChange}
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
