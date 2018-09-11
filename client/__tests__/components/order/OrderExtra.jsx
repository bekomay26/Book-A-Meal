import React from 'react';
import { shallow, mount } from 'enzyme';
import OrderExtra from '../../../src/components/order/OrderExtra';
import { getExtrasResponse } from '../../__mocks__/mockExtras';

describe('Customer Order Form Component Test Suite', () => {
  let props;
  let wrapper;
  const extraArray = getExtrasResponse.extras;

  beforeEach(() => {
    props = {
      extraStatus: [],
      extra: extraArray[0],
      onQtyChange: jest.fn(),
      handleChecked: jest.fn(),
      indexKey: 0,
    };
    wrapper = shallow(<OrderExtra {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('doesnt render page correctly', () => {
    expect(wrapper.find('.menu-modalextra-qty-grid')).toHaveLength(1);
  });

  it('calls handleChecked Function', () => {
    wrapper = mount(<OrderExtra {...props} />);
    wrapper.setProps({
      extraStatus: [extraArray[1]],
    });
    const checkbox = wrapper.find('input').at(0);
    expect(checkbox.prop('checked')).toEqual(false);
    checkbox.simulate('change', { target: { checked: true } });
    expect(props.handleChecked).toHaveBeenCalled();
  });

  it('doesnt calls onQtyChange Function', () => {
    wrapper.setProps({
      extraStatus: [extraArray[1]],
    });
    const inputNum = wrapper.find('input').first();
    expect(inputNum.prop('defaultValue')).toEqual(1);
    inputNum.simulate('input', { target: { value: 9 } });
    expect(props.onQtyChange).toHaveBeenCalled();
  });
});
