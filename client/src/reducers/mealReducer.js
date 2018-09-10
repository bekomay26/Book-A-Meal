import * as types from '../actions/actionTypes';
import initialState from './initialState';

// const menuReducer = (state = { menu: [] }, action) => {
const mealReducer = (state = initialState.meals, action) => {
  switch (action.type) {
    case types.LOAD_MEAL_SUCCESS:
    // console.log(action);
    // console.log(action.meals.meals);
      // console.log(`dddd ${action.meals.meals}`);
      // return { ...state, menu: action.menu.meals };
      // return action.meals.meals;
      return {
        ...state,
        meals: action.meals,
        pagination: action.pagination,
      };
    case types.CREATE_MEAL_SUCCESS:
      // console.log(action.meal.meal);
      // return [...state, Object.assign({}, action.meal.meal)];
      return {
        ...state,
        meals: [action.meal, ...state.meals.filter(meal => meal.id !== action.meal.id)],
      };
    case types.UPDATE_MEAL_SUCCESS:
      console.log(action);
      // return [...state.filter(meal => meal.id !== action.meal.meal.id),
      //   Object.assign({}, action.meal.meal)];
      return {
        ...state,
        meals: [Object.assign({}, action.meal), ...state.meals.filter(meal => meal.id !== action.meal.id)],
        errors: {},
      };
    // case types.LOAD_ONE_MEAL_SUCCESS:
    //   // console.log(action.meals.meals);
    //   return Object.assign({}, ...initialState.ameal, action.meal.meal);
      // return action.meal.meal;
    case types.DELETE_MEAL_SUCCESS:
      // return [...state.filter(meal => meal.id !== action.mealId)];
      return {
        ...state,
        meals: [...state.meals.filter(meal => meal.id !== action.mealId)],
      };
    default:
      return state;
  }
};

export default mealReducer;
