import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as mealActions from '../../src/actions/mealActions';
import * as types from '../../src/actions/actionTypes';
import { getMealsResponse } from '../__mocks__/mockMeal';
import localStorage from '../__mocks__/mockLocalStorage';
import initialState from '../../src/reducers/initialState';

describe('Meal Actions', () => {
  window.localStorage = localStorage;
  // localStorage.setItem('token', JSON.stringify({ token: 'testToken123xyz' }));
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);
  const url = '/api/v1';
  const limit = 10;
  const offset = 0;
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  const mealFormObj = {
    title: 'Eba',
    price: 900,
    extraIds: [1, 2],
    filename: 'eba1.jpg',
  };
  beforeAll(() => {
  });
  beforeEach(() => {
    store.clearActions();
  });
  const mealArray = getMealsResponse.meals;

  it('should create a createMealSuccess action', () => {
    const meal = mealArray[0];
    const expectedAction = { type: types.CREATE_MEAL_SUCCESS, meal };

    // act
    const action = mealActions.createMealSuccess(meal);

    // assert
    expect(action.type).toEqual(expectedAction.type);
  });

  describe('Test suite for GET Meal Actions', () => {
    it('should return get meal success action with payload if get request is successful', () => {
      const expectedResponse = {
        type: types.LOAD_MEAL_SUCCESS,
        meals: getMealsResponse.meals,
        pagination: getMealsResponse.pagination,
      };
      mock.onGet(`${url}/meals?limit=${limit}&offset=${offset}`).reply(200, getMealsResponse);
      return store.dispatch(mealActions.loadMeal())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
    // it('should return get meal failed action if get request fails', () => {
    //   const store = mockStore(initialState);
    //   const expectedResult = {
    //     type: types.GET_MEAL_FAILED,
    //     errors: { message: getMealsFailedResponse.message },
    //   };
    //   moxios.stubRequest(api.meals.get(10, 0), {
    //     status: 500,
    //     response: getMealsFailedResponse,
    //   });
    //   return store.dispatch(getMeals())
    //     .then(() => {
    //       const actions = store.getActions();
    //       expect(actions[1]).toEqual(expectedResult);
    //     });
    // });
  });
  describe('Test suite for POST Meal Actions', () => {
    it('should return save meal success action and payload if save is successful', () => {
      const expectedResponse = {
        type: types.CREATE_MEAL_SUCCESS,
        meal: mealFormObj,
      };
      mock.onPost(`${url}/meals`).reply(201, mealFormObj);
      return store.dispatch(mealActions.saveMeal(mealFormObj))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(expectedResponse.type);
        });
    });
  });

  describe('Test suite for PUT Meal Actions', () => {
    it('should return update meal success action and payload if save is successful', () => {
      const expectedResponse = {
        type: types.UPDATE_MEAL_SUCCESS,
        meal: mealFormObj,
      };
      mock.onPut(`${url}/meals/54`).reply(200, mealFormObj);
      return store.dispatch(mealActions.updateMeal(getMealsResponse.meals[0]))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(expectedResponse.type);
        });
    });
  });

  describe('Test suite for DELETE Meal Actions', () => {
    it('should return update meal success action and payload if save is successful', () => {
      const expectedResponse = {
        type: types.DELETE_MEAL_SUCCESS,
        mealId: 1,
      };
      mock.onDelete(`${url}/meals/1`).reply(200, mealFormObj);
      return store.dispatch(mealActions.deleteMeal(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
  });
});
