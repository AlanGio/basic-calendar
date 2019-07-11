import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';

import { Provider } from 'react-redux'
import configureStore from './store';

import Page from './components/Page';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Page />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
