import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AddMeal from '../../../src/components/meal/AddMeal';
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
// const selected = jest.fn();
function setup() {
  const props = {
    selectValues: [],
    getSelectValue: jest.fn(),
    meal: mealArray[0],
    onSave: jest.fn(),
    saving: false,
    imageUrl: '',
    cardImgList: [],
    handleCardChange: jest.fn(),
    onChange: jest.fn(),
    extrasList: [<select />],
    extrasTopList: [],
    goes: extraArray,
    top: extraArray,
    addExtra: jest.fn(),
    selectChange: jest.fn(),
    selected: jest.fn(),
    extraOptId: 0,
  };
  return mount(<Provider store={store}><AddMeal {...props} /></Provider>, reactrouter.get());
}

describe('The Add meal Component', () => {
  it('should render add meal component correctly', () => {
    const wrapper = setup();
    expect(wrapper.find('Form.add-meal-form').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(3);
  });
  // it('should render add meal component correctly', () => {
  //   const wrapper = setup();
  //   expect(wrapper.find('Form.add-meal-form').length).toEqual(1);
  //   const spy = jest.spyOn(document, 'getElementById');
  // // spy.mockReturnValue({
  // //   style: {
  // //     display: 'block',
  // //   },
  // // });
  // });
});

it('should add extra select input when clicked', () => {
  const wrapper = setup();
  expect(wrapper.find('Dragger').length).toEqual(1);
  expect(wrapper.find('.fa-plus-square').length).toEqual(2);
  expect(wrapper.find('select').length).toEqual(1);
  const addButton = wrapper.find('.fa-plus-square').first();
  addButton.simulate('click');
  const addButton2 = wrapper.find('.fa-plus-square').last();
  addButton2.simulate('click');
  // expect(wrapper.find('.fa-minus.extra-minus').length).toEqual(1);
  // const addButton4 = wrapper.find('.fa-minus.extra-minus').first();
  // addButton4.simulate('click');

  // const addButton3 = wrapper.find('.fa-minus.extra-minus').last();
  // addButton3.simulate('click');
  // expect(wrapper.find('.fa-minus.extra-minus').exists()).toEqual(true);
  wrapper.unmount();
});

it('should add extra select input when clicked', () => {
  const wrapper = setup();
  const addButton = wrapper.find('input').at(1);
  // expect(addButton).toEqual(1);
  addButton.simulate('change', { target: { value: 'folajimi' } });
  expect(addButton.prop('value')).toEqual('gfhgh');
  // expect(wrapper.find('select').length).toEqual(1);
  wrapper.unmount();
});
