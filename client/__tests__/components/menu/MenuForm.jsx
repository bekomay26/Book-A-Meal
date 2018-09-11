import React from 'react';
import { shallow } from 'enzyme';
import MenuForm from '../../../src/components/menu/MenuForm';
import { getMealsResponse } from '../../__mocks__/mockMeal';

describe('Customer Order Form Component Test Suite', () => {
  let props;
  let wrapper;
  const mealArray = getMealsResponse.meals;

  beforeEach(() => {
    props = {
      goesWith: jest.fn().mockReturnValue([]),
      extras: jest.fn().mockReturnValue([]),
      onQtyChange: jest.fn(),
      extraStatus: '',
      handleChecked: jest.fn(),
      totalMealPrice: 0,
      onSave: jest.fn(),
      onClose: jest.fn(),
      saving: false,
      meal: mealArray[0],
    };
    wrapper = shallow(<MenuForm {...props} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
    const subButton = wrapper.find('.orderButton');
    expect(subButton.prop('content')).toEqual('order');
  });

  it('renders without crashing when saving is true', () => {
    wrapper.setProps({ saving: true });
    expect(wrapper).toBeDefined();
    const subButton = wrapper.find('.orderButton');
    expect(subButton.prop('content')).toEqual('ordering');
  });
});
