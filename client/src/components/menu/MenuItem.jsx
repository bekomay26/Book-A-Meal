import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ meal, selected }) => (
  <div
    className="col-48 menu-meal-item"
    onClick={() => selected(meal)}
    onKeyPress={() => selected(meal)}
    tabIndex="0"
    role="button"
  >
    <div className="col-12 image menu-meal-image">
      <img className="menu-meal-img" src={meal.image_url} alt="meal" />
    </div>
    <div className="col-12 imgdesc">
      <div className="row">
        <div className="foodname"><h2>{meal.title}</h2></div>
        <div className="col-8 desc"><p>{meal.description}Periwinkles, stockfish, Palm fruit, Atama and other spices are what makes up this nutritious flavoured soup.</p></div>
      </div>
    </div>
    <div className="col-12 price">
      <div className="col-12 prc">&#x20A6;{meal.price}</div>
    </div>
  </div>
);

MenuItem.propTypes = {
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
    .isRequired,
  selected: PropTypes.func.isRequired,
};

export default MenuItem;
