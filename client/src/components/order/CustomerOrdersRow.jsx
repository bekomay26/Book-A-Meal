import React from 'react';
import PropTypes from 'prop-types';

const CustomerOrdersRow = ({ order, selected, cancelOrder }) => {
  let editButton = (<td onClick={() => selected(order)} className="edit"><i className="far fa-edit" /></td>);
  let delButton = (<td onClick={() => cancelOrder(order.id)} className="del"><i className="far fa-trash-alt" /></td>);
  if (order.status !== 'Pending') {
    editButton = <td />;
    delButton = <td />;
  }
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.Meal.title}</td>
      <td>{order.status}</td>
      <td>{order.totalPrice}</td>
      {editButton}
      {delButton}
      {/* <td onClick={() => selectMealDelBtn(meal)} ><i className="far fa-trash-alt remove"></i></td> */}
    </tr>);
};

CustomerOrdersRow.propTypes = {
  // order: PropTypes.shape,
  selected: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
};

export default CustomerOrdersRow;
