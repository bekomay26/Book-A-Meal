import * as types from '../actions/actionTypes';
import initialState from './initialState';

const extraReducer = (state = initialState.extras, action) => {
  switch (action.type) {
    case types.LOAD_EXTRA_SUCCESS:
      return action.extras.extras;
    default:
      return state;
  }
};

export default extraReducer;
