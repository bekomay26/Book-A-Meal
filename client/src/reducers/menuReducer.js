import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const menuReducer = (state = initialState.menu, action) => {
  switch (action.type) {
    case types.LOAD_MENU_SUCCESS:
      console.log(action.menu.meals);
      // return { ...state, menu: action.menu.meals };
      return action.menu.meals;
    default:
      return state;
  }
};

export default menuReducer;
