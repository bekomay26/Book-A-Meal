import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const loadOrdersSuccess = orders => (
  { type: types.LOAD_ORDERS_SUCCESS, orders }
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

export { loadOrdersSuccess, loadOrders };

