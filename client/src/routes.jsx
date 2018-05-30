import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import App from './components/App';
import HomePage from './components/home/HomePage';
import SignInPage from './components/signin/SignInPage';
import SignUpPage from './components/signup/SignUpPage';

const routes = (
  <div>
    <Switch>
      <Route exact path="/h" component={HomePage} />
      <Route path="/login" component={SignInPage} />
      <Route path="signup" component={SignUpPage} />
    </Switch>
  </div>
);
export default routes;

// export default (
//   <Switch>
//     <Route exact path="/" component={HomePage} />
//     <Route path="/login" component={SignInPage} />
//   </Switch>
//   // <Route path="/" component={HomePage} />
//   // <Route path="/" component={App}>
//   //   <IndexRoute component={HomePage} />
//   //   <Route path="login" component={SignInPage} />
//   //   <Route path="signup" component={SignUpPage} />
//   // </Route>
// );
