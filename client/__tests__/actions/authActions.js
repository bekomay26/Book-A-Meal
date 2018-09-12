import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as authActions from '../../src/actions/authActions';
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
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  beforeAll(() => {
  });
  beforeEach(() => {
    store.clearActions();
  });
  const userDetails = { userId: 9, userName: 'fola', userRole: 'Caterer' };

  describe('Test suite for POST signup Actions', () => {
    it('should return get meal success action with payload if get request is successful', () => {
      const expectedResponse = {
        type: types.SIGN_UP_SUCCESS,
        payload: userDetails,
      };
      mock.onPost(`${url}/auth/signup`).reply(200, userDetails);
      return store.dispatch(authActions.signUp(userDetails))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(expectedResponse.type);
        });
    });
  });

  describe('Test suite for POST signin Actions', () => {
    it('should return save meal success action and payload if save is successful', () => {
      const expectedResponse = {
        type: types.LOGIN_SUCCESS,
        payload: userDetails,
      };
      mock.onPost(`${url}/auth/login`).reply(200, userDetails);
      return store.dispatch(authActions.login(userDetails))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(expectedResponse.type);
        });
    });
  });

  describe('Test suite for Logout Action', () => {
    it('should return log out success action', () => {
      const expectedResponse = {
        type: types.LOG_OUT,
        payload: { userId: null },
      };
      store.dispatch(authActions.logout());
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedResponse);
    });
  });
});
