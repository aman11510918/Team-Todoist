import FirstPage from './firstPage.js';
import HomePage from './homePage.jsx';

import React, { Component } from 'react';
const Cookies = require('js-cookie');

export default class App extends Component {
  state = {
    isLoggedIn: Cookies.get('theToken')
  }

  componentDidUpdate = () => {
    Cookies.remove('theToken');
    this.setState({
      isLoggedIn: Cookies.get('theToken')
    });
  }

  render() {

    console.log('App : token -> ' + this.state.isLoggedIn);
    const logged = this.state.isLoggedIn;

    return (
      <div>
        {logged ? (
          <HomePage />
        ) :
        (
          <FirstPage /> 
        )}
      </div>
    )

  }
}