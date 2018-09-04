import React from 'react';
import NavBar from '../common/NavBar';
// import '../../assets/styles/style.css';

const HomePage = () => (
  <div>
    <header id="bigpic" className="bigpic">
      <NavBar />
      <h1>Book-A-Meal</h1>
      <h3>“One cannot think well, love well, sleep well, if one has not dined well.”
        <span>― Virginia Woolf</span>
      </h3>
    </header>
  </div>
);

export default HomePage;
