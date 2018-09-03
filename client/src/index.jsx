import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import jwt from 'jsonwebtoken';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import checkAuth from './utils/checkAuth';
import configureStore from './store/configureStore';

const store = configureStore();
if (localStorage.token) {
  // setAuthorizationToken(localStorage.token);
  const { userRole } = checkAuth(localStorage.token);
  // store.dispatch(loginSuccess(checkAuth(localStorage.token)));
  if (userRole === 'Caterer') {
    // store.dispatch(loadExtra());
  }
  if (userRole === 'Customer') {
    // store.dispatch(loadOrders());
  }
}
render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        {routes}
      </Router>
      <ReduxToastr />
    </div>
  </Provider>,
  document.getElementById('app'),
);
