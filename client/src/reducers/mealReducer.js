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
      return [...state, Object.assign({}, action.meal.meal)];
    case types.UPDATE_MEAL_SUCCESS:
      return [...state.filter(meal => meal.id !== action.meal.meal.id),
        Object.assign({}, action.meal.meal)];
    case types.LOAD_ONE_MEAL_SUCCESS:
      return Object.assign({}, ...initialState.ameal, action.meal.meal);
    case types.DELETE_MEAL_SUCCESS:
      return [...state.filter(meal => meal.id !== action.mealId)];
    default:
      return state;
  }
};

export default mealReducer;
