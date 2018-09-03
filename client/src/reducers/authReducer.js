import * as types from '../actions/actionTypes';
import checkAuth from '../utils/checkAuth';

const token = window.localStorage.getItem('token');

const authReducer = (state = checkAuth(token), action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isCaterer: (action.payload.userRole === 'Caterer'),
        ...action.payload,
      };
    case types.LOGIN_FALUIRE:
      return { ...state, ...action.payload };
    case types.SIGN_UP_FALUIRE:
      return { ...state, ...action.payload };
    case types.SIGN_UP_SUCCESS:
      return { ...state, ...action.payload };
    case types.LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        isCaterer: false,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
