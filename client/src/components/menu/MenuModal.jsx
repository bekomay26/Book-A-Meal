import React from 'react';
import PropTypes from 'prop-types';
import MealExtra from './MealExtra';


const MenuModal = ({ meal, goesWith, extras }) => {
  // console.log(`goes ${meal}`);
  // console.log(`goedds ${meal.title}`);
  // let goes = [];
  // let extr = [];
  // if (meal !== {}) {
  //   goes = goesWith(meal.extras);
  //   extr = extras(meal.extras);
  // }
  const goes = goesWith(meal.extras);
  const extr = extras(meal.extras);
  
  return (
    <div>
      <div id="modal-container" className="modal">
        <span id="close" className="close">&times;</span>
        <form className="modal-form" action="" method="POST">
          <div className="col-12 image">
            {
              
            }
            {/* <img src="../../images/abak_atama.Jpeg" /> */}
          </div>
          <div className="form-details">
            <div className="foodDesc">
              <h2>{meal.title}</h2>
            </div>
            <div id="mealwith" className="mealwith">
              <div className="row">
                <h4 className="col-6">Goes With</h4>
                <h4 className="col-3">Qty</h4>
                <h4 className="col-3 price-head">Price</h4>
              </div>
              {goes.map(extra =>
                <MealExtra extra={extra} />)
              }
            </div>
            <div id="mealextras" className="mealextra row">
              <div className="row">
                <h4 className="col-6">Extra</h4>
                <h4 className="col-3">Qty</h4>
                <h4 className="col-3 price-head">Price</h4>
              </div>
              {extr.map(extra =>
                <MealExtra extra={extra} />)
              }
            </div>
            <div className="pricetotal row">
              <h4 className="col-9">Total Price</h4>
              <h4 className="col-3 foodprice">&#x20A6;1050</h4>
            </div>
            <div className="order row">
              <button>Order</button>
            </div>
          </div>
        </form>
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

export default MenuModal;
