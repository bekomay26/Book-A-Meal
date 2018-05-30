import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1> I am jkhkola</h1>
        <Link to="signin"> signin </Link>
      </div>
    );
  }
}

export default HomePage;
