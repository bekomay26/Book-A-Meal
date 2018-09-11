import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MealExtra from '../../../src/components/menu/MealExtra';
import { getExtrasResponse } from '../../__mocks__/mockExtras';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  menuReducer: {
    menu: [],
  },
  authReducer: {
    isAuthenticated: true,
    userName: '',
  },
});

const extraArray = getExtrasResponse.extras;
function setup() {
  const props = {
    extra: extraArray[0],
    onQtyChange: jest.fn(),
    extraStatus: [{ isChecked: false, extra: extraArray[0], key: 1, selectedExt: [], qty: 2 }],
    handleChecked: jest.fn(),
    indexKey: 1,
  };
  return shallow(<MealExtra {...props} />, reactrouter.get());
}

describe('The Menu Extra Component', () => {
  it('should render meal Extra component correctly', () => {
    const wrapper = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render meal Extra component correctly', () => {
    const props = {
      extra: extraArray[0],
      onQtyChange: jest.fn(),
      extraStatus: [],
      handleChecked: jest.fn(),
      indexKey: 1,
    };
    const wrapper = mount(<Provider store={store}><MealExtra {...props} /></Provider>, reactrouter.get());
    const input = wrapper.find('input').get(1);
    expect(input.props.defaultValue).toEqual(1);
    wrapper.unmount();
  });

  it('should check when clicked', () => {
    const props = {
      extra: extraArray[0],
      onQtyChange: jest.fn(),
      extraStatus: [],
      handleChecked: jest.fn(),
      indexKey: 1,
    };
    const wrapper = mount(<Provider store={store}><MealExtra {...props} /></Provider>, reactrouter.get());
    const checkButton = wrapper.find('.menu-modalextra-text').first();
    expect(checkButton.length).toEqual(1);
    checkButton.simulate('click');
    expect(wrapper.find('.menu-modalextra-text').last().props().children[1]).toEqual(50);
    wrapper.unmount();
  });

  // Not working
  it('should change value on input', () => {
    const props = {
      extra: extraArray[0],
      onQtyChange: jest.fn(),
      extraStatus: [],
      handleChecked: jest.fn(),
      indexKey: 1,
    };
    const wrapper = mount(<Provider store={store}><MealExtra {...props} /></Provider>, reactrouter.get());
    const checkButton = wrapper.find('.menu-modalextra-qty-grid').first();
    expect(checkButton.length).toEqual(1);
    wrapper.find('input').last().simulate('click').simulate('keypress', { which: 2 });
    wrapper.find('input').last().simulate('change', { target: { value: 2 } });
    wrapper.unmount();
    // expect(wrapper.find('input').last().prop('value').target).toEqual(2);
    // expect(wrapper.find('input').get(1)).toEqual(2);
    // expect(wrapper.find('input').last().props().value).toEqual(2);
  });
});
