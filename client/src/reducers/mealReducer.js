import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const mealReducer = (state = initialState.meals, action) => {
  switch (action.type) {
    case types.LOAD_MEAL_SUCCESS:
      return {
        ...state,
        meals: action.meals,
        pagination: action.pagination,
      };
    case types.CREATE_MEAL_SUCCESS:
      return {
        ...state,
        meals: [action.meal, ...state.meals.filter(meal => meal.id !== action.meal.id)],
      };
    case types.UPDATE_MEAL_SUCCESS:
      return {
        ...state,
        meals: [Object.assign({}, action.meal), ...state.meals.filter(meal => meal.id !== action.meal.id)],
        errors: {},
      };
    case types.DELETE_MEAL_SUCCESS:
      return {
        ...state,
        meals: [...state.meals.filter(meal => meal.id !== action.mealId)],
      };
    case types.CREATE_MEAL_FAILED:
      return {
        ...state,
        meals: action.meals,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default mealReducer;
