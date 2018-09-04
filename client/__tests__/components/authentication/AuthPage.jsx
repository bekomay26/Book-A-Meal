import React from 'react';
import { shallow, mount, render } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AuthPage } from '../../../src/components/signin/AuthPage';

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

function setup(isAuthenticated, isCaterer) {
  const props = {
    isAuthenticated,
    isCaterer,
    userId: undefined,
    // actions: {
    //   login: () => (Promise.resolve()),
    //   signUp: () => (Promise.resolve()),
    // },
    login: jest.fn(),
    signUp: jest.fn(),
  };
  return mount(<AuthPage {...props} />, reactrouter.get());
}

describe('The Auth Page', () => {
  it('It renders Tab', () => {
    const props = {
      isAuthenticated: false,
      isCaterer: false,
      userId: undefined,
      login: jest.fn(),
      signUp: jest.fn(),
      // actions: {
      //   login: () => (Promise.resolve()),
      //   signUp: () => (Promise.resolve()),
      // },
    };
    const wrapper = mount(<AuthPage {...props} />);
    expect(wrapper.find('Tab').length).toEqual(1);
    expect(wrapper.find('.item').length).toEqual(2);
    expect(wrapper.find('SignIn').length).toEqual(1);
  });
});

it('should not render if user is authenticated and a caterer but Redirect to Meals Page', () => {
  const wrapper = setup(true, true);
  expect(wrapper.find('SignIn').length).toBe(0);
  expect(wrapper.find('Redirect').props().to).toEqual('/meals');
});

it('should not render if user is authenticated but Redirect to Menu Page', () => {
  const wrapper = setup(true);
  expect(wrapper.find('SignIn').length).toBe(0);
  expect(wrapper.find('Redirect').props().to).toEqual({ pathname: '/menu' });
});

it('should update state on text input change', () => {
  const wrapper = setup();
  const handleChangeSpy = jest.spyOn(wrapper.instance(), 'onUnameChange');
  const event = {
    preventDefault: jest.fn(),
    target: { name: 'uname', value: 'fola' },
  };
  wrapper.instance().onUnameChange(event);
  expect(wrapper.state().user.uname).toBe('fola');
  expect(handleChangeSpy).toHaveBeenCalled();
});

it('should update state on password input change', () => {
  const wrapper = setup();
  const handleChangeSpy = jest.spyOn(wrapper.instance(), 'onUnameChange');
  const event = {
    preventDefault: jest.fn(),
    target: { name: 'pwd', value: 'fola' },
  };
  wrapper.instance().onUnameChange(event);
  expect(wrapper.state().user.pwd).toBe('fola');
  expect(handleChangeSpy).toHaveBeenCalled();
});

it('should call the submit function', () => {
  // const wrapper = setup();
  // const submitButton = wrapper.find('.loginAuth').last();
  // const props = {
  //   isAuthenticated: false,
  //   isCaterer: false,
  //   userId: undefined,
  //   login: jest.fn(),
  //   signUp: jest.fn(),
  // };
  // const wrapper = shallow(<AuthPage {...props} />);
  // const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
  // const submitButton = wrapper.find('.authButton');
  // submitButton.simulate('click');
  // expect(handleSubmitSpy).toHaveBeenCalled();
});

it('should call the save function', () => {
  const wrapper = setup();
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onSave');
  const event = {
    preventDefault: jest.fn(),
  };
  wrapper.instance().onSave(event);
  // const submitButton = wrapper.find('button');
  // submitButton.simulate('click');
  expect(handleSaveSpy).toHaveBeenCalled();
});

it('should change tab', () => {
  const wrapper = setup();
  const tabButton = wrapper.find('.item').last();
  tabButton.simulate('click');
  expect(wrapper.find('SignIn').length).toBe(0);
  expect(wrapper.find('SignUp').length).toBe(1);
});
// describe('The Auth Page', () => {
//   it('It renders Tab', () => {
//     const wrapper = setup();
//     expect(wrapper.find('Tab').length).toEqual(1);
//   });
// });
