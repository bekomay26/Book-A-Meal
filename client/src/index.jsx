import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';
import configureStore from './store/configureStore';
import { loadMenu } from './actions/menuActions';
import { loadOrders } from './actions/orderActions';
// import createBrowserHistory from 'history/createBrowserHistory';

// const history = createBrowserHistory();
const store = configureStore();
store.dispatch(loadMenu());
store.dispatch(loadOrders());
render(
  // <Router history={history}>
  //   {routes}
  // </Router>,
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app'),
);
