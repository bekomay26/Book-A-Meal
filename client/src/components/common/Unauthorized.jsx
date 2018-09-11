import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/otherpages.css';

const Unauthorized = () => (
  <Fragment>
    <div className="wrong-page-img" />
    <div className="overlay" />
    <div className="wrong-page-content">
      <h1>403</h1>
      {/* <h2>Unauthorized</h2> */}
      <h3>Whoops...</h3>
      <h3>It seems you are not allowed in the kitchen!!!</h3>
      <br />
      <NavLink className="wrong-page-btn" to="/">Go home</NavLink>
    </div>
  </Fragment>
);

export default Unauthorized;
