import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import App from './components/App';
import HomePage from './components/home/HomePage';
import AuthPageConnect from './components/auth/AuthPage';
import MenuPageConnect from './components/menu/MenuPage';
import ManageMealPageConnect from './components/meal/ManageMealPage';
import SetMenuPageConnect from './components/menu/SetMenuPage';
import AdminOrdersPageConnect from './components/order/AdminOrdersPage';
import CustomerOrdersPageConnect from './components/order/CustomerOrdersPage';
import Unauthorized from './components/common/Unauthorized';
import PageNotFound from './components/common/PageNotFound';

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/menu" component={MenuPageConnect} />
      <Route exact path="/menu:id" component={MenuPageConnect} />
      <Route exact path="/setmenu" component={SetMenuPageConnect} />
      <Route exact path="/adorders" component={AdminOrdersPageConnect} />
      <Route exact path="/orders" component={CustomerOrdersPageConnect} />
      <Route exact path="/meals" component={ManageMealPageConnect} />
      <Route exact path="/login" component={AuthPageConnect} />
      <Route exact path="/unauthorized" component={Unauthorized} />
      <Route exact path="/*" component={PageNotFound} />
    </Switch>
  </div>
);
export default routes;
