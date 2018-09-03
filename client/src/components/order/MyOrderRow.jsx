import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

const MyOrderRow = ({ order }) => (
  <div className="row order-card">
    <div className="col-12">
      <div className="col-5 order-imge"><img src={order.Meal.image_url} alt="meal" /></div>
      <div className="col-7 order-meal-top">
        <div className="col-7 order-meal">
          <div className="col-12 order-meal-name">
            <h2>{order.Meal.title}</h2>
          </div>
          <div className="col-12 order-meal-extras">
            <h3>{order.extras.map(extra =>
              <span>{extra.title}, </span>)
              }
            </h3>
          </div>
        </div>
        <div className="order-meal-stat-pc">
          <i className="fas fa-circle order-pend" />
          <span>Pending</span>
        </div>
        <div className="col-5 order-meal-prc">
          <h2>${order.totalPrice}</h2>
        </div>
      </div>
      <div className="col-12 order-meal-info">
        <div className="col-6 order-meal-info-time"><h4>Time ordered: 11:15</h4></div>
        <div className="col-6 order-meal-info-time"><h4 className="order-est-del">Est. delivery time: 11:45</h4></div>
      </div>
      <div className="col-12 order-addr">
        <h4>Address: 6, Ogabi street, Abule-ijesha, yaba, lagos</h4>
      </div>
    </div>
    <div className="col-12 order-meal-status">
      <div className="col-8">
        <i className="fas fa-circle order-pend" />
        <span>Pending</span>
      </div>
      <div className="col-4">
        <div className="col-6">

        </div>
        <div className="col-6">

        </div>
      </div>
    </div>
  </div>
);

MyOrderRow.propTypes = {
  order: PropTypes.shape({
    // user: PropTypes.shape.isRequired,

    // Meal: PropTypes.shape.isRequired,
    // extra: PropTypes.array.isRequired,
    totalPrice: PropTypes.number.isRequired,
  })
    .isRequired,
};

// const MyOrderRowWithCSS = CSSModules(MyOrderRow, styles, { allowMultiple: true });
export default MyOrderRow;
