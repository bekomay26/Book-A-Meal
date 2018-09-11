import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const loadMenuSuccess = menu => (
  { type: types.LOAD_MENU_SUCCESS, menu }
);

const createMenuSuccess = menu => (
  { type: types.CREATE_MENU_SUCCESS, menu }
);
/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const loadMenu = () => dispatch => (
  axios
    .get('api/v1/menu')
    .then((menu) => {
      dispatch(loadMenuSuccess(menu.data));
      // console.log(`fffff ${menu.data.meals[0].title}`);
      // console.log(`gggggg ${loadMenuSuccess(menu.data.meals)}`);
    })
    .catch((err) => {
      // toastr.error(err.response.data.message);
      throw (err);
    })
);

const saveDayMenu = mealIds => dispatch => (
  axios
    .post('api/v1/menu', mealIds)
    .then((savedMenu) => {
      // meal.id ? dispatch(updateMealSuccess(savedMeal)) : dispatch(createMealSuccess(savedMeal));
      dispatch(createMenuSuccess(savedMenu.data));
    })
    .catch((err) => {
      toastr.error(err.response.data.message);
      throw (err);
    })
);

export { loadMenuSuccess, loadMenu, createMenuSuccess, saveDayMenu };

