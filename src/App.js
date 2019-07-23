import React, { Component } from 'react';

import FirstPage from './components/FirstPage';
import HomePage from './components/tasks/HomePage';
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

  render(){
    
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