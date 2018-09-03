import * as types from '../actions/actionTypes';
import initialState from './initialState';

const menuReducer = (state = initialState.menu, action) => {
  switch (action.type) {
    case types.LOAD_MENU_SUCCESS:
      return action.menu.daysMenu.meals;
    case types.CREATE_MENU_SUCCESS:
      return [...state, Object.assign({}, action.menu.menu)];
    default:
      return state;
  }
};

export default menuReducer;
