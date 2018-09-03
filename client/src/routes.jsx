import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AuthPage from './components/auth/AuthPage';
import MenuPage from './components/menu/MenuPage';
import ManageMealPage from './components/meal/ManageMealPage';
import SetMenuPage from './components/menu/SetMenuPage';
// import MyOrdersPage from './components/order/MyOrdersPage';
// import AdminOrdersPage from './components/order/AdminOrdersPage';
// import CustomerOrdersPage from './components/order/CustomerOrdersPage';

const routes = (
  <div>
    <Switch>
      <Route exact path="/h" component={HomePage} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/setmenu" component={SetMenuPage} />
      <Route path="/login" component={AuthPage} />
      <Route path="/meals" component={ManageMealPage} />
    </Switch>
  </div>
);
export default routes;
