import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks';
import './App.css'

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    // Create a simple key-value pair object from id and shelf of myBooks
    this.myBooksOnShelf = {};
    this.props.books.forEach(book => {
      this.myBooksOnShelf[book.id] = book.shelf;
    });

    this.updateBookAndSearch = this.updateBookAndSearch.bind(this);
  }

  state = {
    query: '',
    books: [],
    noResults: false
  }

  updateQuery = (q) => {    
    this.setState({ query: q.trim() });
    this.searchForBooks();
  };  

  searchForBooks = debounce(300, false, () => {
    let q = this.state.query;
    if (q) {
      BooksAPI.search(q)
        .then((results) => {
          if (results.error) {
            this.setState({ books: [], noResults: true });
          } else {
            // Update the search result with shelf info based on myBooks
            results.forEach(r => {
              if (this.myBooksOnShelf.hasOwnProperty(r.id)) {
                r.shelf = this.myBooksOnShelf[r.id];
              } else {
                r.shelf = 'none';
              }
            })
            this.setState({ books: results, noResults: false });
          }          
        })
    } else {
      this.setState({ books: [], noResults: false });
    }
  });

  updateBookAndSearch(book, shelf, books) {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.props.getBooks();
      book.shelf = shelf;
      let updatedSearchResults = books;
      updatedSearchResults.forEach((b) => {
        (b.id === book.id) && (b.shelf = book.shelf);
      })
      this.setState({
        books: updatedSearchResults
      });
      this.myBooksOnShelf[book.id] = book.shelf;      
    });
  }

  render() {

    const { query, books, noResults } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">
            Close
          </Link> 

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            */}
            { /* Search field */ }
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          { query && books.length > 0 && (
            <ListBooks
              books={books}
              getBooks={this.props.getBooks}
              updateBook={this.updateBookAndSearch}
            />
            )
          }
          { noResults && ( <h2>No results.</h2> ) }
        </div>
      </div>   
    )}  
}

export default SearchBooks