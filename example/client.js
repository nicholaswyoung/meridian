import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './components/app';
import configureStore from './store';

const store = configureStore();
const context = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(context, document.getElementById('app'));
