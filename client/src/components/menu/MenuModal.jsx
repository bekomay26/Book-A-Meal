import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
// import { Form, Icon, Input, Button } from 'antd';
import { Form, Header, Button, Icon } from 'semantic-ui-react';
import MealExtra from './MealExtra';
// import styles from '../../assets/styles/menu2.css';


const MenuModal = ({ meal, goesWith, extras, onQtyChange, extraStatus, handleChecked, totalMealPrice, onSave, onClose, saving }) => {
  // console.log(`goes ${meal}`);
  // console.log(`goedds ${meal.title}`);
  // let goes = [];
  // let extr = [];
  // if (meal !== {}) {
  //   goes = goesWith(meal.extras);
  //   extr = extras(meal.extras);
  // }
  // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  const goes = goesWith(meal.extras);
  const goesLength = goes.length;
  const extr = extras(meal.extras);
  const extrLength = extr.length;
  let extrVisibility = 'show-menu-extra';
  if (extrLength === 0) {
    extrVisibility = 'hide-menu-extra';
  }

  return (
    <div>
      <div id="modal-container" className="menu-modal">
        <Form loading={false} className="menu-modal-form" onSubmit={onSave}>
          {/* <span id="close" className="menu-modal-close" onClick={onClose}>&times;</span> */}
          <Icon name="close" className="menu-modal-close" onClick={onClose} />
          <img className="menu-modal-meal" src={meal.image_url} alt="meal" />
          <Header>
            {meal.title}
          </Header>
          {meal.description}
          <div id="mealwith" className="menu-modal-mealwith">
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
          <div id="mealextras" className={`menu-modal-mealextra row ${extrVisibility}`}>
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
          <Form.Button loading={saving} className="authButton" content={saving ? 'ordering' : 'order'} disabled={saving} />
          {/* <div className="menu-order row">
            <input type="submit" value={saving ? 'ordering' : 'order'} disabled={saving} />
          </div> */}
          {/* </div> */}
        </Form>
      {/* <form className="menu-modal-form" onSubmit={onSave}>
          <span id="close" className="menu-modal-close" onClick={onClose}>&times;</span>
          <div className="col-12 image">
            {
              
            }
            <img src="../../images/abak_atama.Jpeg" />
          </div>
          <div className="menu-form-details">
            <div className="foodDesc">
              <h2>{meal.title}</h2>
            </div>
            <div id="mealwith" className="mealwith">
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
            <div id="mealextras" className={`mealextra row ${extrVisibility}`}>
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
              <h4 className="col-3 foodprice">&#x20A6;1050</h4>
            </div>
            <div className="menu-order row">
              <input type="submit" value={saving ? 'ordering' : 'order'} disabled={saving} />
              
            </div>
          </div>
        </form> */}
      </div>
    </div>);
};

MenuModal.propTypes = {
  // meal: PropTypes.arrayOf(PropTypes.shape).isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    extras: PropTypes.shape.isRequired,
  })
    .isRequired,
  goesWith: PropTypes.func.isRequired,
  extras: PropTypes.func.isRequired,
};

// export default CSSModules(MenuModal, styles, { allowMultiple: true });
export default MenuModal;
