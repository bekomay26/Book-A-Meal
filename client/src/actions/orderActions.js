import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as types from './actionTypes';

const loadOrdersSuccess = data => (
  {
    type: types.LOAD_ORDERS_SUCCESS,
    orders: data.orders,
    pagination: data.pagination,
  }
);

const updateOrderSuccess = (order) => {
  toastr.success('Saved', 'Order successfully updated');
  return { type: types.UPDATE_ORDER_SUCCESS, order };
};

const createOrderSuccess = (order) => {
  toastr.success('Saved', 'Thank you for ordering');
  return { type: types.CREATE_ORDER_SUCCESS, order };
};

const deleteOrderSuccess = (orderId) => {
  toastr.success('Order deleted');
  return { type: types.DELETE_ORDER_SUCCESS, orderId };
};
/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const loadOrders = (limit = 10, offset = 0) => dispatch => (
  axios
    .get(`api/v1/orders?limit=${limit}&offset=${offset}`)
    .then((orders) => {
      // console.log(`gggggg ${loadOrdersSuccess(orders)}`);
      dispatch(loadOrdersSuccess(orders.data));
    })
    .catch((err) => {
      // toastr.error(err.response.data.message);
      throw (err);
    })
);

/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const filterOrders = (filterQuery, limit = 10, offset = 0) => dispatch => (
  axios
    .get(`api/v1/orders/filter?${filterQuery}&limit=${limit}&offset=${offset}`)
    .then((orders) => {
      // console.log(`gggggg ${loadOrdersSuccess(orders)}`);
      dispatch(loadOrdersSuccess(orders.data));
    })
    .catch((err) => {
      // toastr.error(err.response.data.message);
      throw (err);
    })
);

const saveOrderFailed = (errorMsg) => {
  toastr.error('Unexpected', errorMsg);
  return { type: types.CREATE_ORDER_FAILED, errorMsg };
};

const saveOrder = order => dispatch => (
  axios
    .post('api/v1/orders', order)
    .then((savedOrder) => {
      dispatch(createOrderSuccess(savedOrder.data));
    })
    .catch((err) => {
      dispatch(saveOrderFailed(err.response.data));
      throw (err);
    })
);

const updateOrder = order => (dispatch) => {
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


const deleteOrder = orderId => dispatch => (
  axios
    .delete(`api/v1/orders/${orderId}`)
    .then(() => {
      dispatch(deleteOrderSuccess(orderId));
    })
    .catch((err) => {
      throw (err);
    })
);

export {
  loadOrdersSuccess, createOrderSuccess, deleteOrderSuccess, updateOrderSuccess,
  loadOrders, saveOrder, updateOrder, deleteOrder, filterOrders,
};

