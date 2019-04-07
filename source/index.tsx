import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Application } from './Application';
import store from './state/store';
import './index.css';
import { check } from './state/modules/user';

store.dispatch(check());

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.querySelector('#root'),
);
