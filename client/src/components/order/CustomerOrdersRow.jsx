import React from 'react';
import PropTypes from 'prop-types';

const CustomerOrdersRow = ({ order, selected, cancelOrder }) => {
  let editButton = (
    <td
      tabIndex="0"
      onKeyPress={() => selected(order)}
      onClick={() => selected(order)}
      role="button"
      className="edit"
    >
      <i className="far fa-edit" />
    </td>);
  let delButton = (
    <td
      onClick={() => cancelOrder(order.id)}
      onKeyPress={() => cancelOrder(order.id)}
      tabIndex="0"
      className="del"
      role="button"
    >
      <i className="far fa-trash-alt" />
    </td>);
  if (order.status !== 'Pending') {
    editButton = <td />;
    delButton = <td />;
  }
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.Meal.title || null}</td>
      <td>{order.status}</td>
      <td>{order.totalPrice}</td>
      {editButton}
      {delButton}
    </tr>);
};

CustomerOrdersRow.propTypes = {
  selected: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default CustomerOrdersRow;
