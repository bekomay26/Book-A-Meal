import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../assets/styles/style.css';
import '../../assets/styles/login.css';

const NavBar = () => (
  <div>
    <div className="back-image" />
    <div className="top row">
      <Link to="/h" className="col-8 logo"><h2>Book-A-Meal</h2></Link>
      <nav className="menu col-4">
        <li className="col-3"><NavLink to="/menu" activeClassName="active">Menu</NavLink></li>
        <li className="col-3"><NavLink to="/cart" activeClassName="active">Order</NavLink></li>
        <li className="col-3"><NavLink to="/login" activeClassName="active">SignIn</NavLink></li>
        <li className="col-3"><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
      </nav>
    </div>
  </div>
);
export default NavBar;
