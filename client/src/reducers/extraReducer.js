import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const extraReducer = (state = initialState.extras, action) => {
  switch (action.type) {
    case types.LOAD_EXTRA_SUCCESS:
      // return { ...state, menu: action.menu.extras };
      return {
        ...state,
        extras: action.extras,
      };
      // return action.extras.extras;
    default:
      return state;
  }
};

export default extraReducer;
