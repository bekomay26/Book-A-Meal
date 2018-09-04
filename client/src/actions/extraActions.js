import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const loadExtraSuccess = extras => (
  { type: types.LOAD_EXTRA_SUCCESS, extras }
);

/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const loadExtra = () => (dispatch) => {
  axios
    .get('api/v1/extras')
    .then((extras) => {
      dispatch(loadExtraSuccess(extras.data));
    })
    .catch((err) => {
      throw (err);
    });
};

export { loadExtraSuccess, loadExtra };

