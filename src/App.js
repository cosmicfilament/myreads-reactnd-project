import React from 'react'
// import * as BooksAPI from './BooksAPI'
import HomePage from './homePage';
import SearchPage from './searchPage';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css'

export default class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // shelves will hold arrays of books
      shelves: {
        currently: [],
        wantTo: [],
        read: [],
        none: []
      }
    };
  };


  render() {

    const { shelves } = this.state;

    return (

      <Router>
        <div className="app">
          <div className="header-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path='/' render={() => (
            <HomePage
              shelves={shelves} />
          )} />
          <Route path='/SearchPage' render={() => (
            <SearchPage
              shelves={shelves} />
          )} />
        </div>
      </Router>
    )
  }
}
