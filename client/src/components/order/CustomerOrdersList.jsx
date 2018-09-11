import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/mm.css';
import CustomerOrdersRow from './CustomerOrdersRow';


const CustomerOrdersList = ({ orders, selected, cancelOrder }) => (
  <div style={{ overflowX: 'auto' }}>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Meal Name</th>
          <th>Status</th>
          <th>Price(&#x20A6;)</th>
          <th />
          <th />
        </tr>
      </thead>
      <tfoot />
      <tbody>
        {orders.map(order =>
          (<CustomerOrdersRow key={order.id} order={order} selected={selected} cancelOrder={cancelOrder} />))
        }
      </tbody>
    </table>
  </div>
);

CustomerOrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selected: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
};

export default CustomerOrdersList;
