import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks';
import './App.css'

class Bookshelf extends Component {

  renderBookShelf(booksOnShelf, shelfTitle) {    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ListBooks
            books={booksOnShelf}
            getBooks={this.props.getBooks}
            updateBook={this.updateBookAndMyBooks}
          />
        </div>
      </div>
    )
  }

  updateBookAndMyBooks(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.getBooks();
    });
  }

  render() {

    const books = this.props.books;
    let currentlyReading = books.filter(book => book.shelf === "currentlyReading");
    let wantToRead = books.filter(book => book.shelf === "wantToRead");
    let read = books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div>
          {this.props.error && ( <h3>Network error...</h3> ) }
        </div>

        <div className="list-books-content">
          <div>
            {this.renderBookShelf(currentlyReading, 'Currently Reading')}
            {this.renderBookShelf(wantToRead, 'Want to Read')}
            {this.renderBookShelf(read, 'Read')}
          </div>
        </div>

        <div className="open-search">
          <Link to="search">
              <button>Add a Book</button>
          </Link>
        </div>

      </div>
    )}  
}

export default Bookshelf