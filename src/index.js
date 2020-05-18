import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import BooksApp from './App'
import './index.css'

ReactDOM.render(
   // Wrap the App inside BrowserRouter to be able to use React Router functions
   <BrowserRouter>
      <BooksApp />
   </BrowserRouter>, 
   document.getElementById('root'));