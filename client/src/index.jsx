import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import routes from './routes';
import setAuthorizationToken from './utils/setAuthorizationToken';
import checkAuth from './utils/checkAuth';
import configureStore from './store/configureStore';
import { loginSuccess } from './actions/authActions';
import { loadMenu } from './actions/menuActions';
import { loadOrders } from './actions/orderActions';
import { loadExtra } from './actions/extraActions';
import './assets/styles/style.css';
import './assets/styles/ui.css';

const store = configureStore();
store.dispatch(loadMenu());
if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  const { userRole } = checkAuth(localStorage.token);
  store.dispatch(loginSuccess(checkAuth(localStorage.token)));
  if (userRole === 'Caterer') {
    store.dispatch(loadExtra());
  }
  if (userRole === 'Customer') {
    store.dispatch(loadOrders());
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
