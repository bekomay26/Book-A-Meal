import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import App from './components/App';
import HomePage from './components/home/HomePage';
import AuthPage from './components/auth/AuthPage';
import MenuPage from './components/menu/MenuPage';
import ManageMealPage from './components/meal/ManageMealPage';
import SetMenuPage from './components/menu/SetMenuPage';
import AdminOrdersPage from './components/order/AdminOrdersPage';
import CustomerOrdersPage from './components/order/CustomerOrdersPage';
import Unauthorized from './components/common/Unauthorized';
import PageNotFound from './components/common/PageNotFound';

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/menu" component={MenuPage} />
      <Route exact path="/menu:id" component={MenuPage} />
      <Route exact path="/setmenu" component={SetMenuPage} />
      <Route exact path="/adorders" component={AdminOrdersPage} />
      <Route exact path="/orders" component={CustomerOrdersPage} />
      <Route exact path="/meals" component={ManageMealPage} />
      <Route exact path="/login" component={AuthPage} />
      <Route exact path="/unauthorized" component={Unauthorized} />
      <Route exact path="/*" component={PageNotFound} />
    </Switch>
  </div>
);
export default routes;
