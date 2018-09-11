import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as orderActions from '../../src/actions/orderActions';
import * as types from '../../src/actions/actionTypes';
import { getMealsResponse } from '../__mocks__/mockMeal';
import localStorage from '../__mocks__/mockLocalStorage';
import initialState from '../../src/reducers/initialState';
import { getOrdersResponse } from '../__mocks__/mockOrders';

describe('Order Actions', () => {
  window.localStorage = localStorage;
  // localStorage.setItem('token', JSON.stringify({ token: 'testToken123xyz' }));
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);
  const url = '/api/v1';
  const limit = 10;
  const offset = 0;
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  const orderFormObj = {
    id: 9,
    title: 'Eba',
    price: 900,
    extraIds: [1, 2],
    status: 'Pending',
  };
  beforeAll(() => {
  });
  beforeEach(() => {
    store.clearActions();
  });
  const orderArray = getOrdersResponse.orders;

  describe('Test suite for GET Order Actions', () => {
    it('should return get order success action with payload if the request is successful', () => {
      const expectedResponse = {
        type: types.LOAD_ORDERS_SUCCESS,
        orders: getOrdersResponse.orders,
        pagination: getOrdersResponse.pagination,
      };
      mock.onGet(`${url}/orders?limit=${limit}&offset=${offset}`).reply(200, getOrdersResponse);
      return store.dispatch(orderActions.loadOrders())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });

    it('should return get filter order success action with payload if the request is successful', () => {
      const expectedResponse = {
        type: types.LOAD_ORDERS_SUCCESS,
        orders: getOrdersResponse.orders,
        pagination: getOrdersResponse.pagination,
      };
      const filterQuery = 'filter';
      mock.onGet(`${url}/orders/filter?${filterQuery}&limit=${limit}&offset=${offset}`).reply(200, getOrdersResponse);
      return store.dispatch(orderActions.filterOrders(filterQuery))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
  });
  describe('Test suite for POST Order Actions', () => {
    it('should return save meal success action and payload if save is successful', () => {
      const expectedResponse = {
        type: types.CREATE_ORDER_SUCCESS,
        order: orderArray[0],
      };
      mock.onPost(`${url}/orders`).reply(201, orderArray[0]);
      return store.dispatch(orderActions.saveOrder(orderArray[0]))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
  });

  describe('Test suite for PUT Order Actions', () => {
    it('should return update meal success action and payload if update status is successful', () => {
      const expectedResponse = {
        type: types.UPDATE_ORDER_SUCCESS,
        order: orderFormObj,
      };
      mock.onPut(`${url}/orders/status/1`).reply(200, orderFormObj);
      return store.dispatch(orderActions.updateOrder(getOrdersResponse.orders[0]))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
    it('should return update meal success action and payload if update order is successful', () => {
      const expectedResponse = {
        type: types.UPDATE_ORDER_SUCCESS,
        order: orderFormObj,
      };
      mock.onPut(`${url}/orders/9`).reply(200, orderFormObj);
      return store.dispatch(orderActions.updateOrder({ id: 9 }))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
  });

  describe('Test suite for DELETE Order Actions', () => {
    it('should return update meal success action and payload if save is successful', () => {
      const expectedResponse = {
        type: types.DELETE_ORDER_SUCCESS,
        orderId: 1,
      };
      mock.onDelete(`${url}/orders/1`).reply(200, orderFormObj);
      return store.dispatch(orderActions.deleteOrder(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedResponse);
        });
    });
  });
});
