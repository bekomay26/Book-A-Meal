import React from 'react';
import PropTypes from 'prop-types';
// import { Form, Icon, Input, Button } from 'antd';
import { Form, Header } from 'semantic-ui-react';
import MealExtra from './MealExtra';
// import styles from '../../assets/styles/menu2.css';


const MenuForm = ({
  meal, goesWith, extras, onQtyChange, extraStatus,
  handleChecked, totalMealPrice, onSave, saving,
}) => {
  const goes = goesWith(meal.extras);
  const goesLength = goes.length;
  const extr = extras(meal.extras);
  const extrLength = extr.length;
  let extrVisibility = 'show-menu-extra';
  if (extrLength === 0) {
    extrVisibility = 'hide-menu-extra';
  }

  return (
    <div id="modal-container">
      <Form loading={false} className="menu-page-form" onSubmit={onSave}>
        <div className="menu-page-form-body" >
          <img className="menu-page-meal-image" src={meal.image_url} alt="meal" />
          <Header>
            <div className="menu-page-meal-title col-10">
              {meal.title}
            </div>
            <div className="menu-page-meal-price col-2">&#x20A6;{meal.price}</div>
          </Header>
          <div className="menu-page-meal-description">{meal.description}</div>
          <div id="mealwith" className="menu-page-mealwith">
            <div className="row">
              <h4 className="col-6">Goes With</h4>
              <h4 className="col-3">Qty</h4>
              <h4 className="col-3 price-head">Price</h4>
            </div>
            {goes.map((extra, index) =>
              (<MealExtra
                extra={extra}
                onQtyChange={onQtyChange}
                extraStatus={extraStatus}
                key={extra.id}
                data-key={extra.id}
                handleChecked={handleChecked}
                indexKey={index}
              />))
            }
          </div>
          <div id="mealextras" className={`menu-page-mealextra row ${extrVisibility}`}>
            <div className="row">
              <h4 className="col-6">Extra</h4>
              <h4 className="col-3">Qty</h4>
              <h4 className="col-3 price-head">Price</h4>
            </div>
            {extr.map((extra, index) =>
              (<MealExtra
                extra={extra}
                onQtyChange={onQtyChange}
                extraStatus={extraStatus}
                key={extra.id}
                data-key={extra.id}
                handleChecked={handleChecked}
                indexKey={index + goesLength}
              />))
            }
          </div>
          <div className="pricetotal row">
            <h4 className="col-9">Total Price</h4>
            <h4 className="col-3 foodprice">&#x20A6;{totalMealPrice}</h4>
          </div>
        </div>
        <Form.Button
          loading={saving}
          className="orderButton"
          content={saving ? 'ordering' : 'order'}
          disabled={saving}
        />

      </Form>
    </div>);
};

MenuForm.propTypes = {
  meal: PropTypes.object.isRequired,
  goesWith: PropTypes.func.isRequired,
  extras: PropTypes.func.isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
  totalMealPrice: PropTypes.number.isRequired,
  saving: PropTypes.bool.isRequired,
  extraStatus: PropTypes.array.isRequired,
};

export default MenuForm;
