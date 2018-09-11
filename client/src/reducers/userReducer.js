import * as types from '../actions/actionTypes';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_USER:
      return [...state, Object.assign({}, action.user)];
    default:
      return state;
  }
};

export default userReducer;
