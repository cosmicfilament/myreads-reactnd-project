import React from 'react';
import HomePage from './homePage';
import SearchPage from './searchPage';
import NotFound from './NotFound';
import * as BooksAPI from './BooksAPI';
import helpers from './helpers';
import cloneDeep from 'lodash.clonedeep';
// package is on npm gives a nice alert msg with many options
import swal from 'sweetalert';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css'

export default class BooksApp extends React.Component {


  state = ({ dataCache: new Map() })

  // retrieves the user's book list from the server
  componentDidMount() {
    BooksAPI.getAll()
      .then((jsonData) => {
        const map = new Map();
        jsonData.map(item => map.set(item.id, item));
        return map;
      })
      .then((map) => {
        this.setState({
          dataCache: map
        });
      });
  }

  // like the wizard of oz, Dick Cheney and currently Vladimir Putin,
  // this is the man behind the curtain. watches onChange coming from the
  // shelfMultiSelect component and updates the application state accordingly
  handleAllChangeEvents = (event) => {
    const target = event.target;
    const name = target.name;
    const shelf = target.value;
    const book = helpers.parseJsonToObject(target.slot);
    // only care about the shelfMultiSelect component
    if (name === 'book-shelf-selector') {

      const oldCache = cloneDeep(this.state.dataCache);

      book.shelf = shelf;
      oldCache.set(book.id, book);

      console.log(`processUpdates-syncServer: target: ${book.id}, shelf: ${book.shelf}`);

      this.setState({ dataCache: oldCache });
      BooksAPI.update(book.id, book.shelf).catch(() => {
        swal("Aw Darn!", "The server failed to save your last change.", "error");
      });
    }

  }

  render() {
    const { dataCache } = this.state;
    return (
      <Router>
        <div className="app" onChange={this.handleAllChangeEvents}>
          <div className="header-books-title">
            <h1>MyReads</h1>
          </div>
          <Switch>
            <Route exact path='/' render={() => (
              <HomePage
                list={cloneDeep(Array.from(dataCache.values()))} />
            )} />
            <Route path='/SearchPage' render={() => (
              <SearchPage
                cacheRef={cloneDeep(dataCache)}
              />
            )} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
