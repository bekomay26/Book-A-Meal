import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import '../../assets/styles/mm.css';

const CustomerOrdersRow = ({ order, selected }) => {
  let editButton = (<td onClick={() => selected(order)} className="edit"><i className="far fa-edit" /></td>);
  if (order.status !== 'Pending') {
    editButton = <td />;
  }
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.Meal.title}</td>
      <td>{order.status}</td>
      <td>&#x20A6;{order.totalPrice}</td>
      {editButton}
      {/* <td onClick={() => selectMealDelBtn(meal)} ><i className="far fa-trash-alt remove"></i></td> */}
    </tr>);
};

CustomerOrdersRow.propTypes = {
  // meal: PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   title: PropTypes.string.isRequired,
  //   description: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  // })
  //   .isRequired,
  // selectMealEditBtn: PropTypes.func.isRequired,
};

export default CustomerOrdersRow;
