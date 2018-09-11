import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as menuActions from '../../src/actions/menuActions';
import * as types from '../../src/actions/actionTypes';
import { getMealsResponse } from '../__mocks__/mockMeal';
import localStorage from '../__mocks__/mockLocalStorage';
import initialState from '../../src/reducers/initialState';

describe('Menu Actions', () => {
  window.localStorage = localStorage;
  // localStorage.setItem('token', JSON.stringify({ token: 'testToken123xyz' }));
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);
  const url = '/api/v1';
  const limit = 10;
  const offset = 0;
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  beforeAll(() => {
  });
  beforeEach(() => {
    store.clearActions();
  });
  const mealArray = getMealsResponse.meals;

  describe('Test suite for GET Menu Actions', () => {
    it('should return get meal success action with payload if get request is successful', () => {
      const expectedResponse = {
        type: types.LOAD_MENU_SUCCESS,
        menu: mealArray,
      };
      mock.onGet(`${url}/menu`).reply(200, mealArray);
      return store.dispatch(menuActions.loadMenu())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
  });

  describe('Test suite for POST Menu Actions', () => {
    it('should return save meal success action and payload if save is successful', () => {
      const mealIds = [1, 2, 3];
      const expectedResponse = {
        type: types.CREATE_MENU_SUCCESS,
        menu: mealArray,
      };
      mock.onPost(`${url}/menu`).reply(201, mealArray);
      return store.dispatch(menuActions.saveDayMenu(mealIds))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
  });
});
