import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/mm.css';
import CustomerOrdersRow from './CustomerOrdersRow';


const CustomerOrdersList = ({ orders, selected }) => (
  <div style={{ overflowX: 'auto' }}>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Meal Name</th>
          <th>price</th>
          <th />
          <th />
        </tr>
      </thead>
      <tfoot />
      <tbody>
        {orders.map(order =>
          (<CustomerOrdersRow order={order} selected={selected} />))
        }
      </tbody>
    </table>
  </div>
);

CustomerOrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default CustomerOrdersList;
