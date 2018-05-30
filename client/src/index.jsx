import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import routes from './routes';
import HomePage from './components/home/HomePage';
// import './styles/styles.css';

const history = createBrowserHistory();

render(
  // <HomePage />,
  <Router history={history}>
    {routes}
  </Router>,
  // <BrowserRouter>
  //   {routes}
  // </BrowserRouter>,
  document.getElementById('app'),
);
