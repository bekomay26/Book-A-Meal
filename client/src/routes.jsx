import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import App from './components/App';
import HomePage from './components/home/HomePage';
import AuthPage from './components/signin/AuthPage';
import SignInPage from './components/signin/SignInPage';
import SignUpPage from './components/signup/SignUpPage';
import MenuPage from './components/menu/MenuPage';
import ManageMealPage from './components/meal/ManageMealPage';
import SetMenuPage from './components/menu/SetMenuPage';
import DayOrdersPage from './components/order/DayOrders';
import MyOrdersPage from './components/order/MyOrdersPage';
import AdminOrdersPage from './components/order/AdminOrdersPage';
import CustomerOrdersPage from './components/order/CustomerOrdersPage';

const routes = (
  <div>
    <Switch>
      <Route exact path="/h" component={HomePage} />
      <Route path="/login" component={SignInPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/menu" component={MenuPage} />
      <Route path="/menu:id" component={MenuPage} />
      <Route path="/setmenu" component={SetMenuPage} />
      <Route path="/orders" component={DayOrdersPage} />
      <Route path="/adorders" component={AdminOrdersPage} />
      {/* <Route path="/myorders" component={MyOrdersPage} /> */}
      <Route path="/myorders" component={CustomerOrdersPage} />
      <Route path="/meals" component={ManageMealPage} />
      <Route path="/auth" component={AuthPage} />
    </Switch>
  </div>
);
export default routes;
