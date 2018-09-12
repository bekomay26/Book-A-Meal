import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedMealForm, { MealForm } from '../../../src/components/meal/MealForm';
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
    meal: mealArray[0],
    onSave: jest.fn(),
    saving: false,
    imageUrl: '',
    cardImgList: [],
    handleCardChange: jest.fn(),
    onChange: jest.fn(),
    extrasList: ['meal', 'meal'],
    extrasTopList: ['meal', 'meal'],
    goes: extraArray,
    top: extraArray,
    addExtra: jest.fn(),
    selectChange: jest.fn(),
    selected: jest.fn(),
    extraOptId: 0,
  };
  return shallow(<ConnectedMealForm {...props} />, reactrouter.get());
}

function mountSetup() {
  const props = {
    meal: mealArray[0],
    onSave: jest.fn(),
    saving: false,
    imageUrl: '',
    cardImgList: [],
    handleCardChange: jest.fn(),
    onChange: jest.fn(),
    extrasList: [<select />],
    extrasTopList: ['meal', 'meal'],
    goes: [],
    top: [],
    addExtra: jest.fn(),
    selectChange: jest.fn(),
    selected: jest.fn(),
    extraOptId: 0,
  };
  return mount(<Provider store={store}><MealForm {...props} /></Provider>, reactrouter.get());
}

describe('The Meal Form Component', () => {
  // it('should render meal form component correctly', () => {
  //   const wrapper = setup();
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('should open drawer when a menu meal is clicked', () => {
    const wrapper = mountSetup();
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('Button').length).toEqual(1);
    wrapper.unmount();
  });
});

it('should add extra select input when clicked', () => {
  const wrapper = mountSetup();
  expect(wrapper.find('Dragger').length).toEqual(1);
  expect(wrapper.find('.fa-plus-square').length).toEqual(2);
  const addButton = wrapper.find('.fa-plus-square').first();
  addButton.simulate('click');
  // expect(wrapper.find('.fa-minus.extra-minus').length).toEqual(1);
  const addButton2 = wrapper.find('.fa-plus-square').last();
  addButton2.simulate('click');
  // expect(wrapper.find('.fa-minus.extra-minus').exists()).toEqual(true);
  // expect(wrapper.find('select').length).toEqual(1);
  wrapper.unmount();
});

// it('should add extra select input when clicked', () => {
//   const wrapper = setup();
//   const addButton = wrapper.find('input').at(1);
//   // expect(addButton).toEqual(1);
//   addButton.simulate('change', { target: { value: 'folajimi' } });
//   expect(addButton.prop('value')).toEqual('gfhgh');
//   // expect(wrapper.find('select').length).toEqual(1);
//   wrapper.unmount();
// });