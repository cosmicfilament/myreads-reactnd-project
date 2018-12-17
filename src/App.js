import React from 'react';
import HomePage from './homePage';
import SearchPage from './searchPage';
import * as BooksAPI from './BooksAPI';
import helpers from './helpers';
import swal from 'sweetalert';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css'

export default class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // map (cache) of json data representing books
      // comprised of initial load data and any search data
      // key: id
      jsonData: new Map(),
      // search results of last search
      searchResults: [],
      // last search query
      lastQuery: ''
    };

    this.search = this.search.bind(this);
    this.processSearchResults = this.processSearchResults.bind(this);
    this.findItemInList = this.findItemInList.bind(this);
    this.handleAllChangeEvents = this.handleAllChangeEvents.bind(this);
  }

  // retrieves the user's book list from the server
  componentDidMount() {
    BooksAPI.getAll()
      .then((jsonData) => {
        const map = new Map();
        jsonData.map(item => map.set(item.id, item));
        return map;
      })
      .then((map) => {
        this.setState(() => ({
          jsonData: map
        }))
      });
  }

  // searches the server for books that match the search criteria
  search = (key, query) => {
    if (key === 'Enter') {
      if (helpers.validateString(query)) {
        BooksAPI.search(query)
          .then((jsonData) => {
            return this.processSearchResults(jsonData);
          })
          .then((obj) => {
            this.setState(() => ({
              jsonData: obj.map,
              searchResults: obj.ary,
              lastQuery: query
            }))
          });
      }
      else {
        this.setState(() => ({
          searchResults: [],
          lastQuery: ''
        }))
      }
    }
  }

  // helper object for search function
  processSearchResults = (searchList) => {
    const map = new Map(this.state.jsonData);
    let searchResults = [];
    // search could return nothing, so check
    if (helpers.validateArray(searchList)) {
      // find what is not in the cache
      let newResults = searchList.filter(searchListItem => !map.has(searchListItem.id));
      // so, we found something
      if (helpers.validateArray(newResults)) {
        newResults = newResults.map((item) => {
          // default the properties that are generally missing
          item.title = helpers.validateString(item.title) ? item.title : 'no Title';
          item.shelf = helpers.validateString(item.shelf) ? item.shelf : 'none';
          item.authors = helpers.validateArray(item.authors) ? item.authors : [];
          // and add them to the cache
          map.set(item.id, item);
          return item;
        });
      }
      // now extract our searchResults back out of the cache as an array
      searchResults = Array.from(map.values()).filter(arrayItem => {
        return arrayItem.id === this.findItemInList(arrayItem.id, searchList);
      });
    }
    return { map: map, ary: searchResults };
  }

  findItemInList(id, list) {
    const item = list.find(listItem => listItem.id === id);
    return helpers.validateObject(item) ? item.id : -1;
  }

  // like the wizard of oz, Dick Cheney and currently Vladimir Putin,
  // this is the man behind the curtain. watches onChange coming from the
  // shelfMultiSelect component and updates the application state accordingly
  handleAllChangeEvents = (event) => {
    const target = event.target;
    const name = target.name;
    const shelf = target.value;
    const targetId = target.id;

    let dirty = false;

    if (name === 'book-shelf-selector') {
      const map = new Map(this.state.jsonData);
      const item = map.get(targetId);
      if (helpers.validateObject(item)) {
        dirty = true;
        item.shelf = shelf;
        map.set(targetId, item);
        this.setState(() => ({
          jsonData: map
        }));
      }
    }

    if (dirty) {
      BooksAPI.update(targetId, shelf).catch((error) => {
        swal("Aw Darn!", "The server failed to save your last change.", "error");
      });
    }

  }

  render() {

    const { jsonData, searchResults, lastQuery } = this.state;

    return (

      <Router>
        <div className="app" onChange={this.handleAllChangeEvents}>
          <div className="header-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path='/' render={() => (
            <HomePage
              list={Array.from(jsonData.values())} />
          )} />
          <Route path='/SearchPage' render={() => (
            <SearchPage
              list={searchResults}
              onSearch={this.search}
              query={lastQuery}
            />
          )} />
        </div>
      </Router>
    );
  }
}
