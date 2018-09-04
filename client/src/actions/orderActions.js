import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as types from './actionTypes';

const loadOrdersSuccess = orders => (
  { type: types.LOAD_ORDERS_SUCCESS, orders }
);

const updateOrderSuccess = order => (
  { type: types.UPDATE_ORDER_SUCCESS, order }
);

const createOrderSuccess = (order) => {
  toastr.success('Saved', 'Thank you for ordering');
  return { type: types.CREATE_ORDER_SUCCESS, order };
};

const deleteOrderSuccess = orderId => (
  { type: types.DELETE_ORDER_SUCCESS, orderId }
);
/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const loadOrders = () => (dispatch) => {
  axios
    .get('api/v1/orders')
    .then((orders) => {
      // console.log(`gggggg ${loadOrdersSuccess(orders)}`);
      dispatch(loadOrdersSuccess(orders.data));
    })
    .catch((err) => {
      // toastr.error(err.response.data.message);
      throw (err);
    });
};

const saveOrder = order => (dispatch) => {
  return axios
    .post('api/v1/orders', order)
    .then((savedOrder) => {
      // order.id ? dispatch(updateOrderSuccess(savedOrder.data)) : dispatch(createOrderSuccess(savedOrder.data));
      dispatch(createOrderSuccess(savedOrder.data));
    })
    .catch((err) => {
      throw (err);
    });
};

const updateOrder = order => (dispatch) => {
  console.log(order.status);
  if (order.status) {
    return axios
      .put(`api/v1/orders/status/${order.id}`, { status: order.status })
      .then((savedOrder) => {
        dispatch(updateOrderSuccess(savedOrder.data));
        // dispatch(createOrderSuccess(savedOrder.data));
      })
      .catch((err) => {
        throw (err);
      });
  }
  // let orderBody = {};
  // orderBody.
  // formData.set('title', meal.title);
  // formData.set('price', meal.price);
  // meal.extraIds.forEach((element) => {
  //   formData.append('extraIds', element);
  // });
  return axios
    .put(`api/v1/orders/${order.id}`, order)
    .then((savedOrder) => {
      dispatch(updateOrderSuccess(savedOrder.data));
      // dispatch(createOrderSuccess(savedOrder.data));
    })
    .catch((err) => {
      throw (err);
    });
};


const deleteOrder = orderId => (dispatch) => {
  axios
    .delete(`api/v1/orders/${orderId}`)
    .then(() => {
      dispatch(deleteOrderSuccess(orderId));
    })
    .catch((err) => {
      throw (err);
    });
};

export { loadOrdersSuccess, createOrderSuccess, deleteOrderSuccess, loadOrders, saveOrder, updateOrder, deleteOrder };

