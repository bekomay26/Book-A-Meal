import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddMenuMeals from '../../../src/components/menu/AddMenuMeals';
import { getMealsResponse } from '../../__mocks__/mockMeal';


const mealArray = getMealsResponse.meals;
function setup() {
  const props = {
    onSave: jest.fn(),
    onSelect: jest.fn(),
    meals: mealArray,
  };
  return shallow(<AddMenuMeals {...props} />, reactrouter.get());
}

describe('The Add Menu Meals Component', () => {
  it('should render AddMenuMeals component correctly', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
