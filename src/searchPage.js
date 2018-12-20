/* eslint-disable no-console */

import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import helpers from './helpers';
import SearchPageClose from './searchPageClose';
import SearchPageResults from './searchPageResults';

// https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md


// searches the server for books that match the search criteria
export default class SearchPage extends React.Component {
    static propTypes = {
        cacheRef: PropTypes.instanceOf(Map).isRequired
    }

    // keeps the search list in sync with the cache
    // for any items that are in both lists
    static getDerivedStateFromProps(nextProps, prevState) {
        const list = prevState.searchList;
        const cacheRef = nextProps.cacheRef;
        let dirty = false;

        list.map((listItem) => {
            if (cacheRef.has(listItem.id)) {
                dirty = true;
                const cacheItem = cacheRef.get(listItem.id);
                listItem.shelf = cacheItem.shelf;

                console.log(`getDerivedStateFromProps: target: ${listItem.id}, shelf: ${listItem.shelf}`);
            }
            return listItem;
        });

        if (dirty) {
            return { searchList: list };
        }
        return null;
    }

    state = {
        searchList: [],
        query: ''
    }

    search = (e) => {
        e.preventDefault();
        const query = e.target.value;
        // the if statement handles empty string for us
        // like when you erase the whole search string
        if (helpers.validateString(query)) {
            BooksAPI.search(query)
                .then((jsonData) => {
                    // terniary statement handles no search results
                    jsonData = helpers.validateArray(jsonData) ? jsonData : [];
                    return jsonData.map((item) => {
                        return item;
                    });
                })
                .then((searchList) => {
                    this.setState({ searchList, query });
                });
        }
        else {
            this.setState({
                searchList: [],
                query: ''
            });
        }
    }

    render() {
        const { searchList, query } = this.state;
        const { search } = this;

        return (
            <div className="search-books" >
                <SearchPageClose />
                <div className="search-books-control">
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            className="search-books-input"
                            type="text"
                            debounceTimeout={500}
                            value={query}
                            onChange={search}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <SearchPageResults
                    title={`Search results for query: ${query}`}
                    searchList={searchList}


                />
            </div>
        );
    }
}
