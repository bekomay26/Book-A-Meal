import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { UserNavBar } from '../../../src/components/common/UserNavBar';

function setup() {
  const props = {
    isAuthenticated: false,
    logout: jest.fn(),
    userName: 'fola',
    isCaterer: false,
  };
  return shallow(<UserNavBar {...props} />, reactrouter.get());
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
  // it('should render admin nav bar component correctly', () => {
  //   const wrapper = setup();
  //   const rangeSpy = jest.spyOn(e, 'preventDefault');
  //   wrapper.setProps({
  //     e: { preventDefault: jest.fn() },
  //   });
  //   wrapper.setState({
  //     visibleSideBar: true,
  //   });
  //   const handleSidebarHideSpy = jest.spyOn(wrapper.instance(), 'handleSidebarHide');
  //   wrapper.instance().handleSidebarHide();
  //   expect(handleSidebarHideSpy).toHaveBeenCalled();
  //   expect(wrapper.state('visibleSideBar')).toEqual(false);
  // });
});
