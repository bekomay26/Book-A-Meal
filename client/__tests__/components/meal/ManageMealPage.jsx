import React from 'react';
import { shallow, mount, render } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ManageMealPage } from '../../../src/components/meal/ManageMealPage';
import { AdminLayout } from '../../../src/components/common/AdminLayout';

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

function setup() {
  const props = {
    meals: [],
    saveMeal: jest.fn(),
    deleteMeal: jest.fn(),
    loadMeal: jest.fn(),
    extras: [],
  };
  return mount(<ManageMealPage {...props} />, reactrouter.get());
}

describe('The Manage Meal Page', () => {
  it('It renders Tab', () => {
    const props = {
      meals: [],
      saveMeal: jest.fn(),
      deleteMeal: jest.fn(),
      loadMeal: jest.fn(),
      extras: [],
    };
    const wrapper = mount(<ManageMealPage {...props} />);
    expect(wrapper.find('Tab').length).toEqual(1);
    expect(wrapper.find('.item').length).toEqual(3);
    expect(wrapper.find('Drawer').length).toEqual(1);
  });
});


it('should call the submit function', () => {
  const wrapper = setup();
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
  const event = {
    preventDefault: jest.fn(),
  };
  wrapper.instance().onSubmit(event);
  // const submitButton = wrapper.find('button');
  // submitButton.simulate('click');
  expect(handleSaveSpy).toHaveBeenCalled();
});
