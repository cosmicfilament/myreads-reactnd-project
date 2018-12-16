import React from 'react'
import HomePage from './homePage';
import SearchPage from './searchPage';
import * as BooksAPI from './BooksAPI';
import helpers from './helpers';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css'

export default class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // udacity book list composite of all the searches this session and initial query
      jsonData: new Map(),
      // search results composite of fetch and jsonData that match the search criteria
      searchResults: []
    };

    this.search = this.search.bind(this);
    this.processSearchResults = this.processSearchResults.bind(this);
    this.handleAllChangeEvents = this.handleAllChangeEvents.bind(this);
  }

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
      })
  }

  search = (key, query) => {

    if (key === 'Enter') {
      BooksAPI.search(query)
        .then((jsonData) => {
          return this.processSearchResults(jsonData);
        })
        .then((obj) => {
          this.setState(() => ({
            jsonData: obj.map,
            searchResults: obj.ary
          }))
        });
    }
  }

  processSearchResults = (searchList) => {
    const map = new Map(this.state.jsonData);
    // searchResults is the combined search criteria from jsonData cache and the search fetch call
    const searchResults = searchList.filter(searchListItem => !map.has(searchListItem.id)).map(
      (searchListItem) => {
        // default props that are not guaranteed to be set
        searchListItem.title = helpers.validateString(searchListItem.title) ? searchListItem.title : 'no Title';
        searchListItem.shelf = helpers.validateString(searchListItem.shelf) ? searchListItem.shelf : 'none';
        searchListItem.authors = helpers.validateArray(searchListItem.authors) ? searchListItem.authors : [];
        // as a nice side effect, the jsonData map gets concatenated with the search criteria with no dupes
        map.set(searchListItem.id, searchListItem);
        return searchListItem;
      });
    return { map: map, ary: searchResults };
  }


  handleAllChangeEvents = (event) => {
    const target = event.target
    const name = target.name;
    const shelf = target.value;
    const targetId = target.id;

    if (name === 'book-shelf-selector') {
      const map = new Map(this.state.jsonData);
      const item = map.get(targetId);
      if (helpers.validateObject(item)) {
        item.shelf = shelf;
        map.set(targetId, item);
        this.setState(() => ({
          jsonData: map
        }));
      }
    }
  }

  render() {

    const { jsonData, searchResults } = this.state;

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
            />
          )} />
        </div>
      </Router>
    )
  }
}
