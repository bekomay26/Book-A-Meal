import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SignUp from '../../../src/components/signin/SignUp';

function setup() {
  const props = {
    isAuthenticated: false,
    isCaterer: false,
    userId: undefined,
    login: jest.fn(),
    signUp: jest.fn(),
  };
  return shallow(<SignUp {...props} />);
}

describe('The SignIn Page', () => {
  it('renders Form', () => {
    const wrapper = setup();
    expect(wrapper.find('Form').length).toEqual(1);
    expect(wrapper.find('.authButton').length).toEqual(1);
    expect(wrapper.find('.auth-field').length).toEqual(3);
    expect(wrapper.find('.auth-field').at(1).prop('placeholder')).toEqual('Where should we deliver your meal...');
  });
});
