import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import menuReducer from './menuReducer';
// import orderReducer from './orderReducer';
import authReducer from './authReducer';
// import mealReducer from './mealReducer';
// import extraReducer from './extraReducer';

const rootReducer = combineReducers({
  menuReducer, authReducer, toastr: toastrReducer,
  // users, menuReducer, orderReducer, authReducer,
  // mealReducer, extraReducer, toastr: toastrReducer,
});

// const rootReducers = (state, action) => {
//   // if (action.type === actionTypes.LOG_OUT) {
//   //   state = undefined;
//   // }
//   return appReducers(state, action);
// };

export default rootReducer;
