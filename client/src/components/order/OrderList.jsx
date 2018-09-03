import React from 'react';
import PropTypes from 'prop-types';
import OrderRow from './OrderRow';


const OrderList = ({ orders }) => (
  <div>
    {orders.map(order =>
      <OrderRow order={order} />)
    }
  </div>
);

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default OrderList;
