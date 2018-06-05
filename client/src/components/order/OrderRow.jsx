import React from 'react';
import PropTypes from 'prop-types';

const OrderRow = ({ order }) => (
  <div>
    <div className=" row">
      <div className="col-1 complete" />
      <div className="col-3">
        {/* <p>{order.user.username}</p> */}
        <p>Fola</p>
      </div>
      <div className="col-4">
        <h3>{order.Meal.title}</h3>
        <div className="foodextras">
          {order.extras.map(extra =>
            <p>{extra.title}</p>)
          }
        </div>
        <h3>{order.totalPrice}</h3>
      </div>
      <div className="col-3">
        <p>Time ordered: 9.00am</p>
        <p>Time deliverd: 9.00am</p>
        <p>Sold by: Folajimi</p>
      </div>
      <div className="col-1 complete" />
    </div>
  </div>
);

OrderRow.propTypes = {
  order: PropTypes.shape({
    // user: PropTypes.shape.isRequired,

    // Meal: PropTypes.shape.isRequired,
    // extra: PropTypes.array.isRequired,
    totalPrice: PropTypes.number.isRequired,
  })
    .isRequired,
};

export default OrderRow;
