import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf';
import SearchBooks from './SearchBooks';
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
                <SearchBooks
					        books={this.state.myBooks}					      
					      />
              )}
            />        
         </div>

      </div>
    )
  }
}

export default BooksApp
