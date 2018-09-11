import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as types from './actionTypes';

const loadMealSuccess = data => ({
  type: types.LOAD_MEAL_SUCCESS,
  meals: data.meals,
  pagination: data.pagination,
});

const createMealSuccess = (meal) => {
  toastr.success('Saved', 'Meal created successfully');
  return { type: types.CREATE_MEAL_SUCCESS, meal: meal.meal };
};

const updateMealSuccess = (meal) => {
  toastr.success('Updated', 'Meal updated successfully');
  return { type: types.UPDATE_MEAL_SUCCESS, meal: meal.meal };
};

const deleteMealSuccess = (mealId) => {
  toastr.success('Meal deleted');
  return { type: types.DELETE_MEAL_SUCCESS, mealId };
};

/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
const loadMeal = (limit = 10, offset = 0) => dispatch => (
  axios
    .get(`api/v1/meals?limit=${limit}&offset=${offset}`)
    .then((meals) => {
      dispatch(loadMealSuccess(meals.data));
    })
    .catch((err) => {
      throw (err);
    })
);

const saveMeal = meal => (dispatch) => {
  const formData = new FormData();
  formData.set('title', meal.title);
  formData.set('price', meal.price);
  formData.set('description', meal.description);
  meal.extraIds.forEach((element) => {
    formData.append('extraIds', element);
  });
  formData.append('image', meal.filename);
  return axios
    .post('api/v1/meals', formData)
    .then((savedMeal) => {
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
  return axios
    .put(`api/v1/meals/${meal.id}`, formData)
    .then((updatedMeal) => {
      dispatch(updateMealSuccess(updatedMeal.data));
    })
    .catch((err) => {
      throw (err);
    });
};


// const deleteMeal = mealId => function (dispatch) {
//   return axios
//     .delete(`api/v1/meals/${mealId}`)
//     .then(() => {
//       dispatch(deleteMealSuccess(mealId));
//     })
//     .catch((err) => {
//       throw (err);
//     });
// };

const deleteMeal = mealId => dispatch => (
  axios
    .delete(`api/v1/meals/${mealId}`)
    .then(() => {
      dispatch(deleteMealSuccess(mealId));
    })
    .catch((err) => {
      throw (err);
    })
);

/**
 * @desc async getdocument action creator
 * @returns {promise} action
 * @param {*} payload data
 */
// const loadOneMeal = mealId => (dispatch) => {
//   axios
//     .get(`api/v1/meals/${mealId}`)
//     .then((meal) => {
//       dispatch(loadOneMealSuccess(meal.data));
//     })
//     .catch((err) => {
//       throw (err);
//     });
// };

export {
  loadMealSuccess,
  loadMeal,
  createMealSuccess,
  updateMealSuccess,
  deleteMealSuccess,
  saveMeal,
  deleteMeal,
  updateMeal,
  // loadOneMeal,
};

