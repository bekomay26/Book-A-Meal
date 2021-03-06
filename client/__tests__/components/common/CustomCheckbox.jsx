import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CustomCheckbox from '../../../src/components/common/CustomCheckbox';

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
    value: '',
  };
  return shallow(<CustomCheckbox {...props} />, reactrouter.get());
}

describe('The Custom Checkbox Component', () => {
  it('should render checkbox component correctly', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
