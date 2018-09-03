import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Upload, Icon, message } from 'antd';
import { Form, FormField, FormInput, Image, Input, Label, Grid, Select } from 'semantic-ui-react';


const AddMenuMeals = ({ onSave, onSelect, meals }) => {
  return (
    <div>
      <form>
        <div className="row">
          {/* <div className="col-4 add-date">
            <input type="date" placeholder="Date" />
            <input type="button" value="Add date" />
          </div>
          <div className="col-5 added-dates">
            <div className="date-added row">
              <p className="col-5">11/09/2018</p>
              <div className="col-7">
                <i className="fa-minus-square remove" />
              </div>
            </div>
            <div className="date-added row">
              <p className="col-5">11/09/2018</p>
              <div className="col-7">
                <i className="fa-minus-square remove" />
              </div>
            </div>
          </div> */}
          <div className="col-12 subm">
            <input type="submit" value="Save Menu" onClick={onSave} />
          </div>
        </div>
        <div className="menu-items">
          {/* <ul id="todayslist" onClick={this.onSelect}> */}
          <ul id="todayslist">
            {
              meals.map(meal =>
                <li onClick={(event) => onSelect(event, meal)}>
                  {meal.title}<span className="sel-menu-item-price">&#x20A6; {meal.price}</span>
                </li>)
            }
          </ul>
          {/* <ul id="todayslist">
            {
              meals.map(meal =>
                <li onClick={(event) => onSelect(event, meal)}>
                  <div className="sel-menu-item-title col-8">{meal.title}</div>
                  <div className="sel-menu-item-price col-4">{meal.price}</div>
                </li>)
            }
          </ul> */}
        </div>
      </form>
    </div>
  );
};

AddMenuMeals.propTypes = {
  // mealextras: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  // })
  //   .isRequired,
  // addBtnClicked: PropTypes.bool.isRequired,
};

// const AddMealWithCSS = CSSModules(AddMeal, styles, { allowMultiple: true });
// export default (AddMealWithCSS);
export default AddMenuMeals;
