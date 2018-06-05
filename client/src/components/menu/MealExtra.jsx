import React from 'react';
import PropTypes from 'prop-types';

const MealExtra = ({ extra }) => (
  <div>
    <div className="row">
      <div className="col-6">
        <input type="checkbox" name="" value="" /><span>{extra.title}</span>
      </div>
      <div className="col-3">
        <input type="number" className="col-3" />
      </div>
      <span className="col-3 foodprice">&#x20A6;{extra.price}</span>
    </div>
  </div>
);

MealExtra.propTypes = {
  extra: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })
    .isRequired,
};

export default MealExtra;
