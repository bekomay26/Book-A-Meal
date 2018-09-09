import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import checkAuth from '../utils/checkAuth';

/**
 * @desc loginfaluire action creator
 * @returns {object} action
 * @param {*} payload data
 */
const loginFailure = payload => ({
  type: types.LOGIN_FAILURE, payload,
});
/**
 * @desc loginSuccess action creator
 * @returns {object} action
 * @param {*} payload data
 */
const loginSuccess = (payload) => {
  toastr.success('', `Welcome, ${payload.userName}`);
  return {
    type: types.LOGIN_SUCCESS, payload,
  };
};
/**
 * @desc login async action creator
 * @returns {Promise} action
 * @param {*} details data
 */
const login = details => dispatch => (
  // dispatch(beginAjaxCall());
  axios
    .post('/api/v1/auth/login', details)
    .then((res) => {
      /* eslint-disable no-undef */
      localStorage.setItem('token', res.data.token);
      setAuthorizationToken(res.data.token);
      dispatch(loginSuccess(checkAuth(res.data.token)));
    })
    .catch((error) => {
      // dispatch(ajaxCallError());
      dispatch(loginFailure(error.response.data));
      throw (error);
    })
);

/**
 * @desc signUpFaliure action creator
 * @param {*} payload data
 * @returns {object} action
 */
const signUpFailure = payload => ({
  type: types.SIGN_UP_FAILURE, payload,
});
/**
 * @desc signUpSuccess
 * @param {*} payload data
 * @returns {object} action
 */
const signUpSuccess = payload => ({
  type: types.SIGN_UP_SUCCESS, payload,
});
/**
 * @desc signUp async action creator
 * @param {*} details
 * @returns {Promise} action
 */
const signUp = details => (dispatch) => {
  // dispatch(beginAjaxCall());
  return axios
    .post('/api/v1/auth/signup', details)
    .then((res) => {
      setAuthorizationToken(res.data.token);
      window.localStorage.setItem('token', res.data.token);
      const user = checkAuth(res.data.token);
      dispatch(signUpSuccess(user));
    })
    .catch((error) => {
      // dispatch(ajaxCallError());
      dispatch(signUpFailure(error.response.data));
      throw (error);
    });
};
/**
 * @desc logout action creator
 * @returns {object} action
 */
const logout = () => {
  window.localStorage.removeItem('token');
  setAuthorizationToken(false);
  return {
    type: types.LOG_OUT, payload: { userId: null },
  };
};
export {
  logout, login, signUp, loginSuccess,
  signUpSuccess, signUpFailure, loginFailure,
};
