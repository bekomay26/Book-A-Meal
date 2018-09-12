import mealReducer from '../../src/reducers/mealReducer';
import * as mealActions from '../../src/actions/mealActions';
import initialState from '../../src/reducers/initialState';
import { getMealsResponse } from '../__mocks__/mockMeal';

const mealArray = getMealsResponse.meals;
describe('Test Suite for CREATE Meal Reducer', () => {
  it('should create a new meal when request is successful', () => {
    const action = mealActions.createMealSuccess(mealArray[0]);
    const newState = mealReducer(initialState.meals, action);
    expect(newState.meals.length).toBe(1);
    // expect(newState.meals[0].title).toBe(mealArray[0].title);
    // expect(newState.meals[0].price).toBe(mealArray[0].price);
  });

  // it('should update state with errors when save request fails', () => {
  //   const action = saveMealFailed(saveMealFailedResponse);
  //   const newState = mealReducer(initialState.meals, action);
  //   expect(newState.meals.length).toBe(0);
  //   expect(newState.errors.message).toBe(saveMealFailedResponse.message);
  // });

  // it('should not update state if action type is invalid', () => {
  //   const action = {
  //     type: null,
  //   };
  //   const newState = mealReducer(initialState.meals, action);
  //   expect(newState).toEqual(initialState.meals);
  // });
});

describe('Test Suite for UPDATE Meal Reducer', () => {
  it('should update state with meal when request is successful', () => {
    const action = mealActions.updateMealSuccess(mealArray[0]);
    const newState = mealReducer(initialState.meals, action);
    expect(newState.meals.length).toBe(1);
    // expect(newState.meals[0].title).toBe(mealArray[0].title);
    // expect(newState.meals[0].price).toBe(mealArray[0].price);
  });
});

describe('Test suite for Meal Reducer - GET', () => {
  it('should update state with meals when Get meal request is successful', () => {
    const action = mealActions.loadMealSuccess(getMealsResponse);
    const newState = mealReducer(undefined, action);
    expect(newState.meals.length).toBeGreaterThan(1);
    expect(newState.meals.length).toEqual(mealArray.length);
  });

  // it('should update state with errors when get meal request fails', () => {
  //   const action = getMealsFailed(getMealsFailedResponse);
  //   const newState = mealReducer(initialState.meals, action);
  //   expect(newState.errors.message).toEqual(getMealsFailedResponse.message);
  // });
});

describe('Test suite for Meal Reducer - DELETE', () => {
  it('should update state by removing meal if delete request is successful', () => {
    const initialStateB = { ...initialState };
    const meal = mealArray[0];
    initialStateB.meals.meals.push(meal);
    const action = mealActions.deleteMealSuccess(meal.id);
    const newState = mealReducer(initialStateB.meals, action);
    expect(newState.meals.length).toBe(0);
  });

  // it('should not update state if delete request fails', () => {
  //   const action = deleteMealFailed(deleteMealFailedResponseB);
  //   const newState = mealReducer(initialState.meals, action);
  //   expect(newState).toEqual(initialState.meals);
  // });
});
