import React from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {

    render() {

        const { shelves } = this.props;

        return (
            <div className="wrapper">
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">


                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">

                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to='/SearchPage'
                        className='open-search-link'>
                        Add a book
                    </Link>
                </div>
            </div>
        );
    }
}
