import authReducer from '../../src/reducers/authReducer';
import * as authActions from '../../src/actions/authActions';
import initialState from '../../src/reducers/initialState';
import { getMealsResponse } from '../__mocks__/mockMeal';

const mealArray = getMealsResponse.meals;
describe('Test Suite for Signup Reducer', () => {
  it('should create a new meal when request is successful', () => {
    const action = authActions.loginSuccess({
      userRole: 'Caterer',
      userId: 1,
      userName: 'Fola',
    });
    const newState = authReducer(initialState.auth, action);
    expect(newState.userName).toEqual('Fola');
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.isCaterer).toEqual(true);
  });
  it('should create a new meal when request is successful', () => {
    const action = authActions.signUpSuccess({
      userRole: 'Caterer',
      userId: 1,
      userName: 'Fola',
    });
    const newState = authReducer(initialState.auth, action);
    expect(newState.userName).toEqual('Fola');
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.isCaterer).toEqual(false);
  });
});

// describe('Test Suite for UPDATE Meal Reducer', () => {
//   it('should update state with meal when request is successful', () => {
//     const action = mealActions.updateMealSuccess(mealArray[0]);
//     const newState = mealReducer(initialState.meals, action);
//     expect(newState.meals.length).toBe(1);
//   });
// });

// describe('Test suite for Meal Reducer - GET', () => {
//   it('should update state with meals when Get meal request is successful', () => {
//     const action = mealActions.loadMealSuccess(getMealsResponse);
//     const newState = mealReducer(undefined, action);
//     expect(newState.meals.length).toBeGreaterThan(1);
//     expect(newState.meals.length).toEqual(mealArray.length);
//   });
// });

// describe('Test suite for Meal Reducer - DELETE', () => {
//   it('should update state by removing meal if delete request is successful', () => {
//     const initialStateB = { ...initialState };
//     const meal = mealArray[0];
//     initialStateB.meals.meals.push(meal);
//     const action = mealActions.deleteMealSuccess(meal.id);
//     const newState = mealReducer(initialStateB.meals, action);
//     expect(newState.meals.length).toBe(0);
//   });
// });
