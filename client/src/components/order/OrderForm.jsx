import React from 'react';
import PropTypes from 'prop-types';
import { Form, Header } from 'semantic-ui-react';
import OrderExtra from './OrderExtra';


const OrderForm = ({
  meal, orderedMeal, goesWith, extras, onQtyChange, extraStatus,
  handleChecked, totalMealPrice, onSave, saving, editable,
}) => {
  const goes = goesWith(meal.extras);
  const goesLength = goes.length;
  const extr = extras(meal.extras);
  const extrLength = extr.length;
  let mealPrice = totalMealPrice;
  let orderBtnVisibility = 'show-menu-extra';
  let extrVisibility = 'show-menu-extra';
  if (extrLength === 0) {
    extrVisibility = 'hide-menu-extra';
  }
  if (editable) {
    mealPrice = totalMealPrice;
  } else {
    orderBtnVisibility = 'hide-menu-extra';
    extraStatus.forEach((ext) => {
      if (ext.price) {
        mealPrice += ext.price;
      }
    });
  }
  return (
    <div id="modal-container">
      <Form loading={false} className="menu-page-form" onSubmit={onSave}>
        <div className="menu-page-form-body" >
          <img className="menu-page-meal-image" src={meal.image_url} alt="meal" />
          <Header>
            <div className="menu-page-meal-title col-10">
              {orderedMeal.title}
            </div>
            <div className="menu-page-meal-price col-2">&#x20A6;{meal.price}</div>
          </Header>
          <div className="menu-page-meal-description">{orderedMeal.description}</div>
          <div id="mealwith" className="menu-page-mealwith">
            <div className="row">
              <h4 className="col-6">Goes With</h4>
              <h4 className="col-3">Qty</h4>
              <h4 className="col-3 price-head">Price</h4>
            </div>
            {goes.map((extra, index) =>
              (<OrderExtra
                extra={extra}
                onQtyChange={onQtyChange}
                extraStatus={extraStatus}
                key={extra.id}
                data-key={extra.id}
                handleChecked={handleChecked}
                indexKey={index}
                editable={editable}
                // extraOrdered={extraOrdered}
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
              (<OrderExtra
                extra={extra}
                onQtyChange={onQtyChange}
                extraStatus={extraStatus}
                key={extra.id}
                data-key={extra.id}
                handleChecked={handleChecked}
                indexKey={index + goesLength}
                editable={editable}
              />))
            }
          </div>
          <div className="pricetotal row">
            <h4 className="col-9">Total Price</h4>
            {/* <h4 className="col-3 foodprice">&#x20A6;{totalMealPrice}</h4> */}
            <h4 className="col-3 foodprice">&#x20A6;{mealPrice}</h4>
          </div>
        </div>
        <Form.Button className={`${orderBtnVisibility} orderButton`} loading={saving} content={saving ? 'ordering' : 'order'} disabled={saving} />

      </Form>
    </div>);
};

OrderForm.propTypes = {
  // meal: PropTypes.arrayOf(PropTypes.shape).isRequired,
  meal: PropTypes.object.isRequired,
  orderedMeal: PropTypes.object.isRequired,
  goesWith: PropTypes.func.isRequired,
  extras: PropTypes.func.isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
  totalMealPrice: PropTypes.number.isRequired,
  saving: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  extraStatus: PropTypes.array.isRequired,
};

export default OrderForm;
