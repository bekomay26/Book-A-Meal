import React from 'react';
import PropTypes from 'prop-types';


const AddMenuMeals = ({ onSave, onSelect, meals }) => (
  <div>
    <form>
      <div className="row">
        <div className="col-12 subm">
          <input type="submit" value="Save Menu" onClick={onSave} />
        </div>
      </div>
      <div className="menu-items">
        <ul id="todayslist">
          {
            meals.map(meal => (
              <li
                key={meal.id}
                onKeyPress={event => onSelect(event, meal)}
                onClick={event => onSelect(event, meal)}
                tabIndex="0"
                role="button"
              >
                {meal.title}<span className="sel-menu-item-price">&#x20A6; {meal.price}</span>
              </li>))
          }
        </ul>
      </div>
    </form>
  </div>
);

AddMenuMeals.propTypes = {
  onSave: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  meals: PropTypes.array.isRequired,
};

export default AddMenuMeals;
