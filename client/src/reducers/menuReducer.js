import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const menuReducer = (state = initialState.menu, action) => {
  switch (action.type) {
    case types.LOAD_MENU_SUCCESS:
      console.log(`fffff ${action.menu.daysMenu.meals}`);
      // return { ...state, menu: action.menu.meals };
      return action.menu.daysMenu.meals;
    case types.CREATE_MENU_SUCCESS:
      // console.log(action.menu);
      return [...state, Object.assign({}, action.menu.menu)];
    default:
      return state;
  }
};

export default menuReducer;
