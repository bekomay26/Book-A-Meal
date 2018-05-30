import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/style.css';

const HomePage = () => {
  return (
    <div>
      <header id="bigpic" className="bigpic">
        <div className="back-image" />
        <div className="top">
          <h2>Book-A-Meal</h2>
          <nav className="menu">
            <li><a href="menu.html">Menu</a></li>
            <li><a href="cart.html">Order</a></li>
            <li><a id="signin-trigger" href="login.html">SignIn</a></li>
          </nav>
        </div>
        <h1>Book-A-Meal</h1>
        <h3>“One cannot think well, love well, sleep well, if one has not dined well.” 
          <span>― Virginia Woolf</span>
        </h3>
      </header>
    </div>
  );
};

export default HomePage;
