import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks';
import './App.css'

class SearchBooks extends Component {

  state = {
    query: '',
    searchResults: [],
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
            this.setState({ searchResults: [], noResults: true });
          } else {
            this.setState({ searchResults: results, noResults: false });
          }          
        })
    } else {
      this.setState({ searchResults: [], noResults: false });
    }
  });

  render() {

    const { query, searchResults, noResults } = this.state;

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
          { query && searchResults.length > 0 && (
            <ListBooks
              books={searchResults}
            />          
            )
          }
          { noResults && ( <h2>No results.</h2> ) }
        </div>
      </div>   
    )}  
}

export default SearchBooks