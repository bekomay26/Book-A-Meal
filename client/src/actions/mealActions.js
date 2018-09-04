import axios from 'axios';
import toastr from 'toastr';
import * as types from './actionTypes';

const loadMealSuccess = meals => (
  { type: types.LOAD_MEAL_SUCCESS, meals }
);

const createMealSuccess = meal => (
  { type: types.CREATE_MEAL_SUCCESS, meal }
);

const updateMealSuccess = meal => (
  { type: types.UPDATE_MEAL_SUCCESS, meal }
);

const deleteMealSuccess = mealId => (
  { type: types.DELETE_MEAL_SUCCESS, mealId }
);

const loadOneMealSuccess = meal => (
  { type: types.LOAD_ONE_MEAL_SUCCESS, meal }
);

/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const loadMeal = () => (dispatch) => {
  axios
    .get('api/v1/meals')
    .then((meals) => {
      dispatch(loadMealSuccess(meals.data));
    })
    .catch((err) => {
      throw (err);
    });
};

const saveMeal = meal => (dispatch) => {
  // console.log(meal.title);
  const formData = new FormData();
  formData.set('title', meal.title);
  formData.set('price', meal.price);
  meal.extraIds.forEach((element) => {
    formData.append('extraIds', element);
  });
  // formData.append('extraIds', meal.extraIds);
  formData.append('image', meal.filename);
  // const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
  return axios
    .post('api/v1/meals', formData)
    .then((savedMeal) => {
      // meal.id ? dispatch(updateMealSuccess(savedMeal)) : dispatch(createMealSuccess(savedMeal));
      dispatch(createMealSuccess(savedMeal.data));
    })
    .catch((err) => {
      throw (err);
    });
};

const updateMeal = meal => (dispatch) => {
  const fields = Object.keys(meal);
  const formData = new FormData();
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];
    if (field !== 'id') {
      if (field === 'extraIds') {
        meal.extraIds.forEach((element) => {
          formData.append('extraIds', element);
        });
      } else {
        formData.set(field, meal[field]);
      }
    }
  }
  console.log(formData.getAll('extraIds'));
  // fields.forEach((field) => {
  //   if (field !== 'id') {
  //     if (field === 'extraIds') {
  //       meal.extraIds.forEach((element) => {
  //         formData.append('extraIds', element);
  //       });
  //     } else {
  //       console.log(field);
  //       formData.set(field, meal[field]);
  //     }
  //   }
  // });
  return axios
    .put(`api/v1/meals/${meal.id}`, formData)
    .then((updatedMeal) => {
      dispatch(updateMealSuccess(updatedMeal.data));
    })
    .catch((err) => {
      throw (err);
    });
};

const deleteMeal = mealId => (dispatch) => {
  axios
    .delete(`api/v1/meals/${mealId}`)
    .then(() => {
      dispatch(deleteMealSuccess(mealId));
    })
    .catch((err) => {
      throw (err);
    });
};

/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const loadOneMeal = mealId => (dispatch) => {
  axios
    .get(`api/v1/meals/${mealId}`)
    .then((meal) => {
      dispatch(loadOneMealSuccess(meal.data));
    })
    .catch((err) => {
      throw (err);
    });
};

export {
  loadMealSuccess,
  loadMeal,
  createMealSuccess,
  updateMealSuccess,
  saveMeal,
  deleteMeal,
  updateMeal,
  loadOneMeal,
};

