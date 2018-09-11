import React from 'react';
import { shallow } from 'enzyme';
import OrderForm from '../../../src/components/order/OrderForm';
import { getOrdersResponse } from '../../__mocks__/mockOrders';
import { getMealsResponse } from '../../__mocks__/mockMeal';

describe('Customer Order Form Component Test Suite', () => {
  const orderArray = getOrdersResponse.orders;
  const mealArray = getMealsResponse.meals;

  function setup() {
    const props = {
      selected: jest.fn(() => 'selected'),
      order: orderArray[1],
      meal: mealArray[0],
      orderedMeal: orderArray[2],
      goesWith: jest.fn().mockReturnValue([]),
      extras: jest.fn().mockReturnValue([]),
      onQtyChange: jest.fn(),
      extraStatus: [],
      handleChecked: jest.fn(),
      totalMealPrice: 0,
      onSave: jest.fn(),
      onClose: jest.fn(),
      saving: false,
    };
    return shallow(<OrderForm {...props} />);
  }
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
  });

  it('doesnt render page correctly', () => {
    const wrapper = setup();
    expect(wrapper.find('.menu-page-form')).toHaveLength(1);
  });

  it('doesnt render page correctly', () => {
    const wrapper = setup();
    wrapper.setProps({
      goesWith: jest.fn().mockReturnValue(['d']),
      extras: jest.fn().mockReturnValue(['d']),
      saving: true,
    });
    expect(wrapper.find('.menu-page-meal-title')).toHaveLength(1);
  });

  // it('renders clickable icon when status is Pending', () => {
  //   expect(wrapper.find('.fa-edit')).toHaveLength(1);
  // });

  // it('calls selected when Edit button is clicked', () => {
  //   const editButton = wrapper.find('.edit').first();
  //   editButton.simulate('click');
  //   expect(props.selected).toHaveBeenCalled();
  // });
});
