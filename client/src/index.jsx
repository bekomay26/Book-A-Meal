import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import configureStore from './store/configureStore';
import { loadMenu } from './actions/menuActions';
import { loadOrders } from './actions/orderActions';

const store = configureStore();
store.dispatch(loadMenu());
store.dispatch(loadOrders());
render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app'),
);
