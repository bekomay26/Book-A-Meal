import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import App from './components/App';
import HomePage from './components/home/HomePage';
import SignInPage from './components/signin/SignInPage';
import SignUpPage from './components/signup/SignUpPage';
import MenuPage from './components/menu/MenuPage';
import DayOrdersPage from './components/order/DayOrders';

const routes = (
  <div>
    <Switch>
      <Route exact path="/h" component={HomePage} />
      <Route path="/login" component={SignInPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/menu:id" component={MenuPage} />
      <Route path="/orders" component={DayOrdersPage} />
    </Switch>
  </div>
);
export default routes;
