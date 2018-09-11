import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SignIn from '../../../src/components/auth/SignIn';


function setup() {
  const props = {
    login: jest.fn(),
    signUp: jest.fn(),
  };
  return shallow(<SignIn {...props} />);
}

describe('The SignIn Page', () => {
  it('renders Form', () => {
    const wrapper = setup();
    expect(wrapper.find('Form').length).toEqual(1);
    expect(wrapper.find('.authButton').length).toEqual(1);
    expect(wrapper.find('.auth-field').length).toEqual(2);
    // const submitButton = wrapper.find('.authButton');
    // submitButton.simulate('click');
  });

//   it('should not render if authenticated', () => {
//     const wrapper = setup(true);
//     expect(wrapper.find('.authForm').length).toEqual(0);
//   });
});
