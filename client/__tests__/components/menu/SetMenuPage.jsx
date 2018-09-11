import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { getMealsResponse } from '../../__mocks__/mockMeal';
import ConnectedMenuPage, { SetMenuPage } from '../../../src/components/menu/SetMenuPage';


const mealArray = getMealsResponse.meals;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  mealReducer: {
    meals: mealArray,
  },
  authReducer: {
    isAuthenticated: true,
    isCaterer: true,
    userName: '',
  },
});

function setup() {
  const props = {
    meals: mealArray,
    saveDayMenu: jest.fn(),
    loadMeal: jest.fn().mockReturnValue(mealArray),
  };
  return shallow(<SetMenuPage {...props} />, reactrouter.get());
}

function mountSetup() {
  const props = {
    meals: mealArray,
    saveDayMenu: jest.fn(),
    loadMeal: jest.fn().mockReturnValue(mealArray),
  };
  return mount(
    <Provider store={store}><ConnectedMenuPage {...props} /></Provider>,
    reactrouter.get(),
  );
}

describe('The Set Menu Meal Page', () => {
  it('should render Set Menu Page component correctly', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Set Menu Page component correctly', () => {
    const wrapper = mountSetup();
    expect(wrapper.find('Tab').length).toEqual(1);
    const tabs = wrapper.find('a.item');
    expect(tabs.length).toEqual(3);
    tabs.at(1).simulate('click');
    expect(tabs.at(1).prop('className')).toEqual('item');
    tabs.at(2).simulate('click');
    expect(tabs.at(2).prop('className')).toEqual('item');
  });

  it('should update state when onSelect is called', () => {
    const wrapper = setup();
    wrapper.setState({
      mealIds: [1, 2],
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        tagName: 'LI',
        classList: { toggle: jest.fn() },
      },
    };
    const nodeCheck = jest.spyOn(event.target.classList, 'toggle');
    nodeCheck.mockReturnValue(true);
    const onSelectSpy = jest.spyOn(wrapper.instance(), 'onSelect');
    wrapper.instance().onSelect(event, mealArray[0]);
    expect(onSelectSpy).toHaveBeenCalled();
    expect(wrapper.state('mealIds')).toEqual([1, 2, 54]);
  });

  it('should not update state when onSelect is called due to an unaccepted tagName', () => {
    const wrapper = setup();
    wrapper.setState({
      mealIds: [1, 2],
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        tagName: 'DE',
        classList: { toggle: jest.fn() },
      },
    };
    const nodeCheck = jest.spyOn(event.target.classList, 'toggle');
    nodeCheck.mockReturnValue(true);
    const onSelectSpy = jest.spyOn(wrapper.instance(), 'onSelect');
    wrapper.instance().onSelect(event, mealArray[0]);
    expect(onSelectSpy).toHaveBeenCalled();
    expect(wrapper.state('mealIds')).toEqual([1, 2]);
  });

  it('should call onSave', () => {
    const wrapper = setup();
    const event = {
      preventDefault: jest.fn(),
    };
    const onSaveSpy = jest.spyOn(wrapper.instance(), 'onSave');
    wrapper.instance().onSave(event);
    expect(onSaveSpy).toHaveBeenCalled();
  });

  it('should update state when redirectTo is called', () => {
    const wrapper = setup();
    wrapper.setState({ activeIndex: 1 });
    const event = {
      preventDefault: jest.fn(),
    };
    const redirectToSpy = jest.spyOn(wrapper.instance(), 'redirectTo');
    wrapper.instance().redirectTo(event, 2);
    expect(redirectToSpy).toHaveBeenCalled();
    expect(wrapper.state('activeIndex')).toEqual(2);
  });

  it('should update state when handleTabChange is called', () => {
    const wrapper = setup();
    wrapper.setState({ activeIndex: 1 });
    const handleTabChangeSpy = jest.spyOn(wrapper.instance(), 'handleTabChange');
    wrapper.instance().handleTabChange(82);
    expect(handleTabChangeSpy).toHaveBeenCalled();
    expect(wrapper.state('activeIndex')).toEqual(82);
  });
});
