import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';


const MenuList = ({ meals, selected }) => (
  <div>
    {meals.map(meal =>
      <MenuItem meal={meal} selected={selected} />)
    }
  </div>
);

MenuList.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selected: PropTypes.func.isRequired,
};

export default MenuList;
