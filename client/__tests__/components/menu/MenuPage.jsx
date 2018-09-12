import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MenuPage2 from '../../../src/components/menu/MenuPage';
import { MenuPage } from '../../../src/components/menu/MenuPage';
import { getMenuResponse } from '../../__mocks__/mockMenu';
import { getExtrasResponse } from '../../__mocks__/mockExtras';

// import jsdom from 'jsdom';
// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
// global.document = doc
// global.window = doc.defaultView
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

const menuArray = [];
const menuArray2 = getMenuResponse.menu.meals;
const extraArray = getExtrasResponse.extras;
function setup() {
  const props = {
    meals: menuArray,
    saveMeal: jest.fn(),
    saveOrder: jest.fn(),
    deleteMeal: jest.fn(),
    loadMeal: jest.fn(),
    loadMenu: jest.fn(),
    extras: [],
  };
  return shallow(<MenuPage {...props} />, reactrouter.get());
}

describe('The Menu Page', () => {
  // it('should render Menu Page component correctly', () => {
  //   const wrapper = setup();
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('It renders Drawer, Menu list and the Nav bar', () => {
    // const wrapper = setup();
    const props = {
      menu: menuArray,
      saveOrder: jest.fn(),
      logout: jest.fn(),
      isAuthenticated: true,
      loadMenu: jest.fn(),
    };
    const wrapper = mount(<Provider store={store}><MenuPage {...props} /></Provider>, reactrouter.get());
    expect(wrapper.find('Drawer').length).toEqual(4);
    expect(wrapper.find('MenuList').length).toEqual(1);
    expect(wrapper.find('UserNavBar').length).toEqual(1);
    wrapper.unmount();
    // expect(wrapper.find('Drawer').length).toEqual(1);
  });
});


it('should call the save function', () => {
  const wrapper = setup();
  wrapper.setState({
    saving: null,
    visible: true,
    extraStatus: [
      { isChecked: true, extra: { id: 1 }, qty: 8 },
      { isChecked: false, extra: { id: 2 }, qty: 18 },
      { isChecked: true, extra: { id: 3 }, qty: 28 },
    ],
  });
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onSave');
  const redirectSpy = jest.spyOn(wrapper.instance(), 'redirect');
  const event = {
    preventDefault: jest.fn(),
  };
  wrapper.instance().onSave(event);
  expect(handleSaveSpy).toHaveBeenCalled();
  expect(wrapper.state('saving')).toEqual(true);
  expect(wrapper.state('visible')).toEqual(true);
  wrapper.instance().redirect();
  expect(redirectSpy).toHaveBeenCalled();
  expect(wrapper.state('saving')).toEqual(false);
  // expect(spyClose).toHaveBeenCalled();
  // expect(spyRedirect).toHaveBeenCalled();
});

it('should call the updatePredicate function', () => {
  const wrapper = setup();
  window.innerWidth = 961;
  wrapper.setState({ isDesktop: false });
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'updatePredicate');
  wrapper.instance().updatePredicate();
  expect(handleSaveSpy).toHaveBeenCalled();
  expect(wrapper.state('isDesktop')).toEqual(true);
});

it('should call the myMeal function', () => {
  const wrapper = setup();
  wrapper.setState({ meal: menuArray2[0], basePrice: 100, totalPrice: 250 });
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'myMeal');
  wrapper.instance().myMeal();
  expect(handleSaveSpy).toHaveBeenCalled();
});

it('should call the goesWith function', () => {
  const wrapper = setup();
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'goesWith');
  wrapper.instance().goesWith();
  expect(handleSaveSpy).toHaveBeenCalled();
});

it('should call the onTop function', () => {
  const wrapper = setup();
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onTop');
  wrapper.instance().onTop();
  expect(handleSaveSpy).toHaveBeenCalled();
});

it('should call the onClose function', () => {
  const wrapper = setup();
  const spy = jest.spyOn(document, 'getElementById');
  spy.mockReturnValue({
    style: {
      display: 'block',
    },
  });
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onClose');
  const handleSaveSpy2 = jest.spyOn(wrapper.instance(), 'clearExtrasFields');
  wrapper.instance().onClose();
  expect(handleSaveSpy).toHaveBeenCalled();
  expect(handleSaveSpy2).toHaveBeenCalled();
});

it('should call the quantity changed function', () => {
  const wrapper = setup();
  wrapper.setState({
    meal: menuArray2[0],
    extraStatus: [{ isChecked: true, extra: extraArray[0], key: 1 }, { isChecked: false, extra: extraArray[0], key: 1 }],
  });
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onQtyChange');
  const event = {
    preventDefault: jest.fn(),
    target: { value: 1 },
  };
  wrapper.instance().onQtyChange(event, 1, 50);
  expect(handleSaveSpy).toHaveBeenCalled();
});

it('should call the handle checked function', () => {
  const wrapper = setup();
  wrapper.setState({
    meal: menuArray2[0],
    selectedExtras: [],
    extraStatus: [
      {
        isChecked: true, extra: extraArray[0], key: 1, selectedExt: [],
      },
    ],
    totalPrice: 0,
  });
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handleChecked');
  const event = {
    preventDefault: jest.fn(),
    target: { value: 1 },
  };
  wrapper.instance().handleChecked(event, 1, extraArray[0], 5);
  expect(handleSaveSpy).toHaveBeenCalled();
});

it('should call the handle unchecked function', () => {
  const wrapper = setup();
  wrapper.setState({
    meal: menuArray2[0],
    selectedExtras: [],
    extraStatus: [
      {
        isChecked: false, extra: extraArray[0], key: 1, selectedExt: [],
      },
    ],
    totalPrice: 0,
  });
  const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handleChecked');
  const event = {
    preventDefault: jest.fn(),
    target: { value: 1 },
  };
  wrapper.instance().handleChecked(event, 1, extraArray[0], 5);
  expect(handleSaveSpy).toHaveBeenCalled();
});

it('should open drawer when a menu meal is clicked', () => {
  // const wrapper = setup();
  const props = {
    menu: menuArray2,
    saveMeal: jest.fn(),
    deleteMeal: jest.fn(),
    loadMeal: jest.fn(),
    loadMenu: jest.fn(),
    extras: [],
  };
  const wrapper = mount(<Provider store={store}><MenuPage {...props} /></Provider>, reactrouter.get());
  wrapper.setState({ meal: menuArray2[0], extraStatus: [{ isChecked: true, extra: extraArray[0], key: 1, selectedExt: [] }] });
  const menuItemArray = wrapper.find('MenuItem');
  expect(menuItemArray.length).toEqual(2);
  menuItemArray.first().simulate('click');
  expect(wrapper.find('Drawer').length).toEqual(4);
  expect(wrapper.find('Button').length).toEqual(1);
  expect(wrapper.find('.ant-drawer-close-x').simulate('click'));
  wrapper.unmount();
  // wrapper.find('Button').simulate('click');
  // const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
  // expect(handleSaveSpy).toHaveBeenCalled(1);
});

it('should show navbar if authenticated', () => {
  store.isAuthenticated = false;
  const props = {
    menu: menuArray2,
    saveMeal: jest.fn(),
    deleteMeal: jest.fn(),
    loadMeal: jest.fn(),
    loadMenu: jest.fn(),
    extras: [],
  };
  const wrapper = mount(<Provider store={store}><MenuPage {...props} /></Provider>, reactrouter.get());
  wrapper.setState({ meal: menuArray2[0], extraStatus: [{ isChecked: true, extra: extraArray[0], key: 1, selectedExt: [] }] });
  const menuItemArray = wrapper.find('MenuItem');
  expect(menuItemArray.length).toEqual(2);
  expect(wrapper.find('#myTopnav').find('.navlink').length).toEqual(13); // should be 4
  expect(wrapper.find('.col-3.navlink.out.show').length).toEqual(3); // should be 0
  wrapper.unmount();
});
// it('should open drawer when a menu meal is clicked', () => {
//   // const wrapper = setup();
//   const props = {
//     menu: menuArray2,
//     saveMeal: jest.fn(),
//     deleteMeal: jest.fn(),
//     loadMeal: jest.fn(),
//     loadMenu: jest.fn(),
//     extras: [],
//   };
//   const wrapper = mount(<Provider store={store}><MenuPage {...props} /></Provider>, reactrouter.get());
//   wrapper.setState({ meal: menuArray2[0], extraStatus: [{ isChecked: true, extra: extraArray[0], key: 1, selectedExt: [] }] });
//   const menuItemArray = wrapper.find('MenuItem');
//   expect(menuItemArray.length).toEqual(2);
//   menuItemArray.first().simulate('click');
//   expect(wrapper.find('Drawer').length).toEqual(4);
//   expect(wrapper.find('Button').length).toEqual(1);
//   expect(wrapper.find('.ant-drawer-close-x').simulate('click'));
//   // wrapper.find('Button').simulate('click');
//   // const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
//   // expect(handleSaveSpy).toHaveBeenCalled(1);
// });
