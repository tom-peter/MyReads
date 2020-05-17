import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'

ReactDOM.render(
   // Wrap the App inside BrowserRouter to be able to use React Router functions
   <BrowserRouter>
      <App />
   </BrowserRouter>, 
   document.getElementById('root'));