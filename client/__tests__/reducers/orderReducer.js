import orderReducer from '../../src/reducers/orderReducer';
import * as orderActions from '../../src/actions/orderActions';
import initialState from '../../src/reducers/initialState';
import { getOrdersResponse } from '../__mocks__/mockOrders';

const orderArray = getOrdersResponse.orders;
describe('Test Suite for CREATE Order Reducer', () => {
  it('should create a new order when request is successful', () => {
    const action = orderActions.createOrderSuccess(orderArray[0]);
    const newState = orderReducer(initialState.orders, action);
    expect(newState.orders.length).toBe(1);
    expect(newState.orders[0].title).toBe(orderArray[0].title);
    expect(newState.orders[0].price).toBe(orderArray[0].price);
  });
});

describe('Test Suite for UPDATE Order Reducer', () => {
  it('should update state with order when request is successful', () => {
    const action = orderActions.updateOrderSuccess(orderArray[0]);
    const newState = orderReducer(initialState.orders, action);
    expect(newState.orders.length).toBe(1);
    expect(newState.orders[0].title).toBe(orderArray[0].title);
    expect(newState.orders[0].price).toBe(orderArray[0].price);
  });
});

describe('Test suite for Order Reducer - GET', () => {
  it('should update state with orders when Get order request is successful', () => {
    const action = orderActions.loadOrdersSuccess(getOrdersResponse);
    const newState = orderReducer(undefined, action);
    expect(newState.orders.length).toBeGreaterThan(1);
    expect(newState.orders.length).toEqual(orderArray.length);
  });
});

describe('Test suite for Order Reducer - DELETE', () => {
  it('should update state by removing order if delete request is successful', () => {
    const initialStateB = { ...initialState };
    const order = orderArray[0];
    initialStateB.orders.orders.push(order);
    const action = orderActions.deleteOrderSuccess(order.id);
    const newState = orderReducer(initialStateB.orders, action);
    expect(newState.orders.length).toBe(0);
  });
});
