import React from 'react';
import PropTypes from 'prop-types';
import MyOrderRow from './MyOrderRow';


const MyOrderList = ({ orders }) => (
  <div>
    {orders.map(order =>
      <MyOrderRow order={order} />)
    }
  </div>
);

MyOrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MyOrderList;
