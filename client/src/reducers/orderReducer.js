import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const orderReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.LOAD_ORDERS_SUCCESS:
      // return { ...state, menu: action.menu.meals };
      // console.log(action.orders);
      return action.orders.orders;
    default:
      return state;
  }
};

export default orderReducer;
