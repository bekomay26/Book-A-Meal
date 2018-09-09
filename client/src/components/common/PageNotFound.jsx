import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/otherpages.css';

const PageNotFound = () => (
  <Fragment>
    <div className="wrong-page-img2" />
    <div className="overlay" />
    <div className="wrong-page-content">
      <h1>404</h1>
      <h3>Whoops...!!!</h3>
      <h3>We could not find the meal you were looking for</h3>
      <br />
      <NavLink className="wrong-page-btn" to="/menu">See the menu</NavLink>
    </div>
  </Fragment>
);

export default PageNotFound;
