import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AuthPage from './components/auth/AuthPage';
import MenuPage from './components/menu/MenuPage';
import ManageMealPage from './components/meal/ManageMealPage';
import SetMenuPage from './components/menu/SetMenuPage';
import AdminOrdersPage from './components/order/AdminOrdersPage';
import CustomerOrdersPage from './components/order/CustomerOrdersPage';

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/menu" component={MenuPage} />
      <Route exact path="/setmenu" component={SetMenuPage} />
      <Route exact path="/login" component={AuthPage} />
      <Route exact path="/meals" component={ManageMealPage} />
      <Route exact path="/adorders" component={AdminOrdersPage} />
      <Route exact path="/orders" component={CustomerOrdersPage} />
    </Switch>
  </div>
);
export default routes;
