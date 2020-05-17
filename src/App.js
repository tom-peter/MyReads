import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';
import './App.css'

class BooksApp extends Component {
  state = {
    myBooks: []
  }
  
  // Fetch books from Udacity
  componentDidMount() {
    BooksAPI.getAll()
      .then((myBooks) => {
        this.setState(() => ({
          myBooks
        }))
      })
      .then(() => {
        console.log(this.state.myBooks);
      })
      // TODO: error handling?
  }

  render() {

    return (
      <div className="app">
         <div>
            { /* the main screen is the Bookshelf screen */ }
            <Route path='/' exact
              render={() => (
                <Bookshelf
					        books={this.state.myBooks}					      
					      />
                
              )}
            />
         
            { /* Search screen */ }
            <Route path='/search'
               render={() => (

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
      
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                      */}
                      <input type="text" placeholder="Search by title or author"/>
      
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid"></ol>
                  </div>
                </div>   

               )}
            />        
         </div>

      </div>
    )
  }
}

export default BooksApp
