import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ meal, selected }) => {
  console.log(`menu ${meal}`);
  // curMeal(meal);
  // const currentMeal = Object.assign({}, meal);
  const currentMeal = () => selected(meal);
  return(
  <div>
    <div className="row item" onClick={() => selected(meal)}>
      <div className="col-2 image">
        <img src={meal.image_url} alt="meal" />
      </div>
      <div className="col-10 imgdesc">
        <div className="row">
          <div className="col-6 foodname"><h2>{meal.title}</h2></div>
        </div>
        <div className="row">
          <div className="col-8 desc"><p>{meal.description}</p></div>
          <div className="col-4 prc">&#x20A6;{meal.price}</div>
        </div>
      </div>
    </div>
  </div>);
};

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
