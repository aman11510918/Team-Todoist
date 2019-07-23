import './index.css';
// import App from './App';

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import HomePage from './homePage';


ReactDOM.render(<HomePage />, document.getElementById('root'));

serviceWorker.unregister();
