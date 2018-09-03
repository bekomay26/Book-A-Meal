import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const orderReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.LOAD_ORDERS_SUCCESS:
      // return { ...state, menu: action.menu.meals };
      return action.orders.orders;
    case types.CREATE_ORDER_SUCCESS:
      return [...state, Object.assign({}, action.order.newOrder)];
    case types.UPDATE_ORDER_SUCCESS:
    console.log(action);
      return [...state.filter(order => order.id !== action.order.order.id),
        Object.assign({}, action.order.order)];
    case types.DELETE_ORDER_SUCCESS:
      return [...state.filter(order => order.id !== action.orderId)];
    default:
      return state;
  }
};

export default orderReducer;
