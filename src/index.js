import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './homePage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<HomePage />, document.getElementById('root'));
serviceWorker.unregister();
