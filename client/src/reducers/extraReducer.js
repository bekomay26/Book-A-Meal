import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const extraReducer = (state = initialState.extras, action) => {
  switch (action.type) {
    case types.LOAD_EXTRA_SUCCESS:
      return {
        ...state,
        extras: action.extras,
      };
    default:
      return state;
  }
};

export default extraReducer;
