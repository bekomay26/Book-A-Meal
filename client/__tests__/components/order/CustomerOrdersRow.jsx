import React from 'react';
import { shallow } from 'enzyme';
import CustomerOrdersRow from '../../../src/components/order/CustomerOrdersRow';
import { getOrdersResponse } from '../../__mocks__/mockOrders';

describe('Customer Order Row Component Test Suite', () => {
  let props;
  let wrapper;
  const orderArray = getOrdersResponse.orders;

  beforeEach(() => {
    props = {
      selected: jest.fn(() => 'selected'),
      order: orderArray[1],
    };
    wrapper = shallow(<CustomerOrdersRow {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('doesnt render clickable icon when status is not Pending', () => {
    wrapper.setProps({ order: orderArray[0] });
    expect(wrapper.find('.fa-edit')).toHaveLength(0);
  });

  it('renders clickable icon when status is Pending', () => {
    expect(wrapper.find('.fa-edit')).toHaveLength(1);
  });

  it('calls selected when Edit button is clicked', () => {
    const editButton = wrapper.find('.edit').first();
    editButton.simulate('click');
    expect(props.selected).toHaveBeenCalled();
  });
});
