import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AdminNavBar } from '../../../src/components/common/AdminNavBar';

function setup() {
  const props = {
    isAuthenticated: false,
    logout: jest.fn(),
    userName: 'fola',
    isCaterer: false,
  };
  return shallow(<AdminNavBar {...props} />, reactrouter.get());
}

describe('The Admin Nav Bar Component', () => {
  it('should render admin nav bar component correctly', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render admin nav bar component correctly', () => {
    const wrapper = setup();
    wrapper.setState({
      visibleSideBar: false,
    });
    const openSideNavSpy = jest.spyOn(wrapper.instance(), 'openSideNav');
    wrapper.instance().openSideNav();
    expect(openSideNavSpy).toHaveBeenCalled();
    expect(wrapper.state('visibleSideBar')).toEqual(true);
  });

  it('should render admin nav bar component correctly', () => {
    const wrapper = setup();
    wrapper.setState({
      visibleSideBar: true,
    });
    const handleSidebarHideSpy = jest.spyOn(wrapper.instance(), 'handleSidebarHide');
    wrapper.instance().handleSidebarHide();
    expect(handleSidebarHideSpy).toHaveBeenCalled();
    expect(wrapper.state('visibleSideBar')).toEqual(false);
  });
});
