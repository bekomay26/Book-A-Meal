import { combineReducers } from 'redux';
import users from './userReducer';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  users, menuReducer, orderReducer, authReducer,
});

// const rootReducers = (state, action) => {
//   // if (action.type === actionTypes.LOG_OUT) {
//   //   state = undefined;
//   // }
//   return appReducers(state, action);
// };

export default rootReducer;
