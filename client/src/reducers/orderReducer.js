import * as types from '../actions/actionTypes';
import initialState from './initialState';

const orderReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        pagination: action.pagination,
      };
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [action.order, ...state.orders.filter(order => order.id !== action.order.id)],
      };
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [Object.assign({}, action.order), ...state.orders.filter(order => order.id !== action.order.id)],
        errors: {},
      };
    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders.filter(order => order.id !== action.orderId)],
      };
    default:
      return state;
  }
};

export default orderReducer;
