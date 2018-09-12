import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MealRow from '../../../src/components/meal/MealRow';
import { getMealsResponse } from '../../__mocks__/mockMeal';
import { getExtrasResponse } from '../../__mocks__/mockExtras';

// import jsdom from 'jsdom';
// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
// global.document = doc
// global.window = doc.defaultView
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  authReducer: {
    isAuthenticated: false,
    isCaterer: false,
    errors: {},
  },
});

const mealArray = getMealsResponse.meals;
const extraArray = getExtrasResponse.extras;

function setup() {
  const props = {
    selectMealEditBtn: jest.fn(),
    selectMealDelBtn: jest.fn(),
    mealGoesWith: jest.fn().mockReturnValue([]),
    mealOnTop: jest.fn().mockReturnValue([]),
    meal: mealArray[0],
    addExtra: jest.fn(),
    selectChange: jest.fn(),
    selected: jest.fn(),
    extraOptId: 0,
  };
  return shallow(<MealRow {...props} />, reactrouter.get());
}

function mountSetup() {
  const props = {
    selectMealEditBtn: jest.fn(),
    selectMealDelBtn: jest.fn(),
    mealGoesWith: jest.fn().mockReturnValue([]),
    mealOnTop: jest.fn().mockReturnValue([]),
    meal: mealArray[1],
    addExtra: jest.fn(),
    selectChange: jest.fn(),
    selected: jest.fn(),
    extraOptId: 0,
  };
  return mount(<Provider store={store}><MealRow {...props} /></Provider>, reactrouter.get());
}

describe('The Meal Row Component', () => {
  // it('should render meal row component correctly', () => {
  //   const wrapper = setup();
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  // it('doesnt calls handleChecked Function', () => {
  //   const wrapper = mountSetup();
  //   wrapper.setProps({
  //     mealGoesWith: jest.fn().mockReturnValue(extraArray),
  //   });
  //   wrapper.debug();
  //   const btn = wrapper.find('.extra-minus').at(0);
  //   btn.simulate('click');
  //   expect(wrapper.prop('selected')).toHaveBeenCalled();
  // });

  it('should open drawer when a menu meal is clicked', () => {
    const wrapper = mountSetup();
    wrapper.find('.edit').simulate('click');
    expect(wrapper.find('.edit').length).toEqual(1);
    wrapper.unmount();
  });

  it('should open drawer when a menu meal is clicked', () => {
    const wrapper = mountSetup();
    wrapper.find('.fa-trash-alt').simulate('click');
    expect(wrapper.find('.fa-trash-alt').length).toEqual(1);
    wrapper.unmount();
  });

  it('When extras list is empty', () => {
    const props = {
      selectMealEditBtn: jest.fn(),
      selectMealDelBtn: jest.fn(),
      mealGoesWith: jest.fn().mockReturnValue([]),
      mealOnTop: jest.fn().mockReturnValue([]),
      meal: mealArray[4], // No extras meal
      addExtra: jest.fn(),
      selectChange: jest.fn(),
      selected: jest.fn(),
      extraOptId: 0,
    };
    const wrapper = mount(<Provider store={store}><MealRow {...props} /></Provider>, reactrouter.get());
    expect(wrapper.find('.fa-trash-alt').length).toEqual(1);
    expect(wrapper.find('.edit').length).toEqual(1);
    wrapper.unmount();
  });
});

