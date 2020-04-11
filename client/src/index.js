import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk';
const middleware = [
  thunk
];
const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*
const enhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());
  */
const store = createStore(rootReducer, withDevTools(
  applyMiddleware(...middleware)));
ReactDOM.render(<Provider store={store}><App /></Provider>,
  document.getElementById('root'));
serviceWorker.unregister();