// This must be the first line in src/index.js
import 'react-app-polyfill/ie11';
import 'core-js/fn/array/includes';
import 'core-js/fn/string/includes';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createReduxStore from './store';

const store = createReduxStore();

ReactDOM.render((
  <Provider store={store}>
    <App dataUrl="data.json" />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
