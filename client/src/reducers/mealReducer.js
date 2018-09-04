import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const mealReducer = (state = initialState.meals, action) => {
  switch (action.type) {
    case types.LOAD_MEAL_SUCCESS:
    console.log(action);
      // console.log(`dddd ${action.meals.meals}`);
      // return { ...state, menu: action.menu.meals };
      return action.meals.meals;
    case types.CREATE_MEAL_SUCCESS:
      console.log(action.meal.meal);
      return [...state, Object.assign({}, action.meal.meal)];
    case types.UPDATE_MEAL_SUCCESS:
      console.log(action);
      return [...state.filter(meal => meal.id !== action.meal.meal.id),
        Object.assign({}, action.meal.meal)];
    case types.LOAD_ONE_MEAL_SUCCESS:
      // console.log(action.meals.meals);
      return Object.assign({}, ...initialState.ameal, action.meal.meal);
      // return action.meal.meal;
    case types.DELETE_MEAL_SUCCESS:
      return [...state.filter(meal => meal.id !== action.mealId)];
    default:
      return state;
  }
};

export default mealReducer;
