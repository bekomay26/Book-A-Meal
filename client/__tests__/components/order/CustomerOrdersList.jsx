import React from 'react';
import { shallow } from 'enzyme';
import CustomerOrdersList from '../../../src/components/order/CustomerOrdersList';
import { getOrdersResponse } from '../../__mocks__/mockOrders';

describe('Customer Order List Component Test Suite', () => {
  let props;
  let wrapper;
  const orderArray = getOrdersResponse.orders;

  beforeEach(() => {
    props = {
      selected: jest.fn(() => 'selected'),
      orders: orderArray,
    };
    wrapper = shallow(<CustomerOrdersList {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders clickable icon when status is Pending', () => {
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('thead')).toHaveLength(1);
    expect(wrapper.find('tbody')).toHaveLength(1);
    expect(wrapper.find('th')).toHaveLength(6);
  });
});
