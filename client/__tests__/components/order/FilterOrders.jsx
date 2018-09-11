import React from 'react';
import { shallow } from 'enzyme';
import FilterOrders from '../../../src/components/order/FilterOrders';

describe('Customer Order Form Component Test Suite', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      saving: false,
      onSubmit: jest.fn(),
    };
    wrapper = shallow(<FilterOrders {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    const subButton = wrapper.find('.filterOrderButton');
    expect(subButton.prop('content')).toEqual('Filter');
  });

  // it('doesnt render page correctly', () => {
  //   expect(wrapper.find('.menu-modalextra-qty-grid')).toHaveLength(1);
  // });

  it('renders without crashing when saving is true', () => {
    wrapper.setProps({ saving: true });
    expect(wrapper).toBeDefined();
    const subButton = wrapper.find('.filterOrderButton');
    expect(subButton.prop('content')).toEqual('Filtering');
  });

  // it('doesnt calls onQtyChange Function', () => {
  //   wrapper.setProps({
  //     extraStatus: [extraArray[1]],
  //   });
  //   const inputNum = wrapper.find('input').first();
  //   expect(inputNum.prop('defaultValue')).toEqual(1);
  //   inputNum.simulate('input', { target: { value: 9 } });
  //   expect(props.onQtyChange).toHaveBeenCalled();
  // });
});
