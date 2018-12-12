import React from 'react'
// import * as BooksAPI from './BooksAPI'
import LandingPage from './landingPage';
import SearchPage from './searchPage';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css'

export default class BooksApp extends React.Component {

  render() {

    const Home = () => <LandingPage />;
    const Search = () => <SearchPage />;

    /**@Todo Have exact Path route transform to say Home */

    return (
      <Router>
        <div className="app">
          <Route exact path='/' component={Home} />
          <Route path='/SearchPage' component={Search} />
        </div>
      </Router>
    )
  }
}
