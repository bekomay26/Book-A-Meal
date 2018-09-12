import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Swal from 'sweetalert2';
import thunk from 'redux-thunk';
import  ConnectManageMeal, { ManageMealPage } from '../../../src/components/meal/ManageMealPage';
// import ManageMealPage2 from '../../../src/components/meal/ManageMealPage';
// import { AdminLayout } from '../../../src/components/common/AdminLayout';
import { getMenuResponse } from '../../__mocks__/mockMenu';
import { getExtrasResponse } from '../../__mocks__/mockExtras';
import { getMealsResponse } from '../../__mocks__/mockMeal';

// import jsdom from 'jsdom';
// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
// global.document = doc
// global.window = doc.defaultView

const mealArray = getMealsResponse.meals;
const extraArray = getExtrasResponse.extras;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  mealReducer: {
    meals: mealArray,
    // pagination: {},
    pagination: {},
    // pagination: {
    //   limit: 10,
    //   offset: 0,
    //   totalPages: 1,
    //   totalCount: 3,
    //   pageNum: 1,
    // },
  },
  extraReducer: {
    extras: extraArray,
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
    saveMeal: jest.fn(),
    deleteMeal: jest.fn(),
    loadMeal: jest.fn().mockReturnValue(mealArray),
    loadExtra: jest.fn().mockReturnValue(extraArray),
    updateMeal: jest.fn(),
    extras: extraArray,
    logout: jest.fn(),
    pagination: {
      limit: 10,
      offset: 0,
      totalPages: 1,
      totalCount: 3,
      pageNum: 1,
    },
  };
  return shallow(<ManageMealPage {...props} />, reactrouter.get());
  // return mount(<Provider store={store}><ConnectManageMeal {...props} /></Provider>, reactrouter.get());
}

function mountSetup() {
  const props = {
    meals: mealArray,
    saveMeal: jest.fn(),
    deleteMeal: jest.fn(),
    loadMeal: jest.fn().mockReturnValue(mealArray),
    loadExtra: jest.fn().mockReturnValue(extraArray),
    updateMeal: jest.fn(),
    extras: extraArray,
    logout: jest.fn(),
    pagination: {
      limit: 10,
      offset: 0,
      totalPages: 1,
      totalCount: 3,
      pageNum: 1,
    },
  };
  return mount(<Provider store={store}><ConnectManageMeal {...props} /></Provider>, reactrouter.get());
}

describe('The Manage Meal Page', () => {
  // it('should render Manage meal component correctly', () => {
  //   const wrapper = setup();
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });
  
  // it('should rhave three tab bars', () => {
  //   const wrapper = setup();
  //   expect(wrapper.find('.item').length).toEqual(3);
  // });

  it('should be called ', () => {
    const props = {
      meals: [],
      saveMeal: jest.fn(),
      deleteMeal: jest.fn(),
      loadMeal: jest.fn().mockReturnValue(mealArray),
      loadExtra: jest.fn().mockReturnValue(extraArray),
      updateMeal: jest.fn(),
      extras: extraArray,
      logout: jest.fn(),
      pagination: {
        limit: 10,
        offset: 0,
        totalPages: 1,
        totalCount: 3,
        pageNum: 1,
      },
    };
    const wrapper = mount(<Provider store={store}><ConnectManageMeal {...props} /></Provider>, reactrouter.get());
    expect(wrapper.find('Drawer').length).toEqual(4);
    expect(wrapper.find('.item').length).toEqual(3);
    wrapper.unmount();
  });

  it('should display add meal component when tab is clicked', () => {
    const wrapper = mountSetup();
    expect(wrapper.find('Drawer').length).toEqual(4);
    expect(wrapper.find('.item').length).toEqual(3);
    expect(wrapper.find('#addContainer').length).toEqual(0);
    const tab2 = wrapper.find('.item').at(1);
    tab2.simulate('click');
    expect(wrapper.find('#addContainer').length).toEqual(1);
    wrapper.unmount();
  });

  it('should display add extra component when tab is clicked', () => {
    const wrapper = mountSetup();
    expect(wrapper.find('Drawer').length).toEqual(4);
    expect(wrapper.find('.item').length).toEqual(3);
    expect(wrapper.find('#addExtraContainer').length).toEqual(0);
    const tabExtra = wrapper.find('.item').last();
    tabExtra.simulate('click');
    expect(wrapper.find('#addExtraContainer').length).toEqual(1);
    wrapper.unmount();
  });

  it('call goesWith method when onSelectAddBtn is called', () => {
    const wrapper = setup();
    const onSelectAddSpy = jest.spyOn(wrapper.instance(), 'onSelectAddBtn');
    const goesWithSpy = jest.spyOn(wrapper.instance(), 'goesWith');
    wrapper.instance().onSelectAddBtn('event', 'goes');
    expect(onSelectAddSpy).toHaveBeenCalled();
    expect(goesWithSpy).toHaveBeenCalled();
  });

  it('call onTop method when onSelectAddBtn is called', () => {
    const wrapper = setup();
    wrapper.setState({
      extrasTopList: [{ key: 4 }, { key: 5 }, { key: 6 }],
      selectValues: [{ key: 4 }, { key: 5 }],
      extraOptId: 9,
    });
    const onSelectAddSpy = jest.spyOn(wrapper.instance(), 'onSelectAddBtn');
    const onTopSpy = jest.spyOn(wrapper.instance(), 'onTop');
    wrapper.instance().onSelectAddBtn('event', 'top');
    expect(onSelectAddSpy).toHaveBeenCalled();
    expect(onTopSpy).toHaveBeenCalled();
    expect(wrapper.state('selectValues')).toEqual([{ key: 4 }, { key: 5 }, { key: '9', selectValue: 'chicken', id: 0 }]);
    expect(wrapper.state('extraOptId')).toEqual(10);
    expect(wrapper.state('extrasTopList')).toEqual([{ key: 4 }, { key: 5 }, { key: 6 }, 'event']);
  });

  it('Updates state when handleSelectChange is called', () => {
    const wrapper = setup();
    wrapper.setState({ selectValues: [{ key: 4 }, { key: 5 }] });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handleSelectChange');
    const childNode = {
      node: <div ext-id="gg" />,
      getAttribute: jest.fn(),
    };
    const nodeChild = jest.spyOn(childNode, 'getAttribute');
    nodeChild.mockReturnValue(4);
    const event = {
      preventDefault: jest.fn(),
      target: {
        parentNode: { getAttribute: jest.fn() },
        selectedIndex: 1,
        childNodes: [childNode, childNode],
        value: 10,
      },
    };
    const nodeParent = jest.spyOn(event.target.parentNode, 'getAttribute');
    nodeParent.mockReturnValue(4);
    wrapper.instance().handleSelectChange(event);
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('selectValues')).toEqual([{ key: 4 }, { key: 5 }]);
    // expect(wrapper.state('selectValues')).toEqual([ { key: 5 }, { key: 4, selectValue: 10, id: 4 } ]);
  });

  it('Updates state when handlePageChange is called', () => {
    const wrapper = setup();
    wrapper.setProps({ loadMeal: jest.fn() });
    wrapper.setState({ currentPage: 1 });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');
    wrapper.instance().handlePageChange(4);
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('currentPage')).toEqual(4);
  });
  
  it('Updates state when updateMealState is called', () => {
    const wrapper = setup();
    const event = {
      target: {
        name: 'title',
        value: "fola's eba",
      },
    };
    wrapper.setState({
      meal: mealArray[0],
      updatedMeal: mealArray[0],
    });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'updateMealState');
    wrapper.instance().updateMealState(event);
    expect(handleSaveSpy).toHaveBeenCalled();
    const newMeal = mealArray[0];
    newMeal.title = "fola's eba";
    expect(wrapper.state('meal')).toEqual(newMeal);
    expect(wrapper.state('meal').title).toEqual("fola's eba");
  });

  it('Updates state when updateMealState is called', () => {
    const wrapper = setup();
    const event = {
      target: {
        name: 'filename',
        files: ['file1', 'file2'],
      },
    };
    wrapper.setState({
      meal: mealArray[0],
      updatedMeal: mealArray[0],
    });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'updateMealState');
    wrapper.instance().updateMealState(event);
    expect(handleSaveSpy).toHaveBeenCalled();
    const newMeal = mealArray[0];
    newMeal.filename = 'file1';
    expect(wrapper.state('meal')).toEqual(newMeal);
    expect(wrapper.state('meal').filename).toEqual('file1');
  });

  it('Updates extrasList state when addExtrasOnEdit is called', () => {
    const wrapper = setup();
    wrapper.setState({
      extrasList: ['egg'],
      extrasTopList: [],
      extraOptId: 1,
    });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'addExtrasOnEdit');
    wrapper.instance().addExtrasOnEdit(['a', 'b'], 'goes');
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('extrasList')).toEqual(['egg', 'a', 'b']);
    expect(wrapper.state('extrasTopList')).toEqual([]);
    expect(wrapper.state('extraOptId')).toEqual(3);
  });

  it('Updates extrasTopList state when addExtrasOnEdit is called', () => {
    const wrapper = setup();
    wrapper.setState({
      extrasList: ['egg'],
      extrasTopList: ['beans'],
      extraOptId: 1,
    });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'addExtrasOnEdit');
    wrapper.instance().addExtrasOnEdit(['a', 'b', 'c'], 'with');
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('extrasList')).toEqual(['egg']);
    expect(wrapper.state('extrasTopList')).toEqual(['beans', 'a', 'b', 'c']);
    expect(wrapper.state('extraOptId')).toEqual(4);
  });

  it('should clear state fields when clearExtrasFields is called', () => {
    const wrapper = setup();
    wrapper.setState({
      extrasList: ['egg'],
      extrasTopList: ['beans'],
      selectValues: [1, 2, 3],
      extraOptId: 1,
    });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'clearExtrasFields');
    wrapper.instance().clearExtrasFields();
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('extrasList')).toEqual([]);
    expect(wrapper.state('extrasTopList')).toEqual([]);
    expect(wrapper.state('selectValues')).toEqual([]);
    expect(wrapper.state('extraOptId')).toEqual(0);
  });

  it('should update state when handleCardChange is called', () => {
    const wrapper = setup();
    const blob = new Blob();
    wrapper.setState({
      meal: { filename: 'girl' },
      cardImgList: ['img1'],
    });
    const info = {
      file: {
        originFileObj: blob,
      },
    };
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handleCardChange');
    const getBase64Spy = jest.spyOn(wrapper.instance(), 'getBase64');
    wrapper.instance().handleCardChange(info);
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(getBase64Spy).toHaveBeenCalled();
    expect(wrapper.state('meal').filename).toEqual(blob);
    expect(wrapper.state('cardImgList')).toEqual(info);
  });

  it('should call getBase64', () => {
    const wrapper = setup();
    const getBase64Spy = jest.spyOn(wrapper.instance(), 'getBase64');
    wrapper.instance().getBase64(new Blob(), jest.fn());
    expect(getBase64Spy).toHaveBeenCalled();
  });

  it('should update visible state when showDrawer is called', () => {
    const wrapper = setup();
    wrapper.setState({ visible: false });
    const getBase64Spy = jest.spyOn(wrapper.instance(), 'showDrawer');
    wrapper.instance().showDrawer();
    expect(getBase64Spy).toHaveBeenCalled();
    expect(wrapper.state('visible')).toEqual(true);
  });

  // it('Updates state when onSelectMealDelBtn is called', () => {
  //   const wrapper = setup();
  //   const meal = mealArray[0];
  //   wrapper.setState({ meal: {} });
  //   // jest.spyOn(Swal).mockReturnValue({ value: 4 });
  //   jest.mock('sweetalert2', () => ({ value: true }));
  //   const handleDeleteBtnSpy = jest.spyOn(wrapper.instance(), 'onSelectMealDelBtn');
  //   wrapper.instance().onSelectMealDelBtn(meal);
  //   expect(handleDeleteBtnSpy).toHaveBeenCalled();
  //   expect(wrapper.state('meal')).toEqual(meal);
  // });

  it('should update visible state when onCloseDrawer is called', () => {
    const wrapper = setup();
    wrapper.setState({ visible: true });
    const getCloseDrawerSpy = jest.spyOn(wrapper.instance(), 'onCloseDrawer');
    wrapper.instance().onCloseDrawer();
    expect(getCloseDrawerSpy).toHaveBeenCalled();
    expect(wrapper.state('visible')).toEqual(false);
  });

  it('should update meal state when onSelectMealEditBtn is called', () => {
    const wrapper = setup();
    wrapper.setState({
      extrasList: ['egg'],
      extrasTopList: ['beans'],
      selectValues: [1, 2, 3],
      extraOptId: 1,
      meal: {},
      visible: false,
    });
    const getEditBtnSpy = jest.spyOn(wrapper.instance(), 'onSelectMealEditBtn');
    wrapper.instance().onSelectMealEditBtn(mealArray[0], [1, 2, 3, 4], [5, 6, 7, 8]);
    expect(getEditBtnSpy).toHaveBeenCalled();
    expect(wrapper.state('meal')).toEqual(mealArray[0]);
    expect(wrapper.state('visible')).toEqual(true);
    expect(wrapper.state('extrasList')).toEqual([1, 2, 3, 4]);
    expect(wrapper.state('extrasTopList')).toEqual([5, 6, 7, 8]);
    // const getShowDrawerSpy = jest.spyOn(wrapper.instance(), 'showDrawer');
    // const clearExtSpy = jest.spyOn(wrapper.instance(), 'clearExtrasFields');
    // const addExtSpy = jest.spyOn(wrapper.instance(), 'addExtrasOnEdit');
    // expect(getShowDrawerSpy).toHaveBeenCalled();
    // expect(clearExtSpy).toHaveBeenCalled();
    // expect(addExtSpy).toHaveBeenCalled();
  });

  it('should call onTop', () => {
    const wrapper = setup();
    const onTopSpy = jest.spyOn(wrapper.instance(), 'onTop');
    wrapper.instance().onTop();
    expect(onTopSpy).toHaveBeenCalled();
  });

  // it('should call onTop', () => {
  //   const props = {
  //     meals: mealArray,
  //     saveMeal: jest.fn(),
  //     deleteMeal: jest.fn(),
  //     loadMeal: jest.fn().mockReturnValue(mealArray),
  //     loadExtra: jest.fn().mockReturnValue(extraArray),
  //     updateMeal: jest.fn(),
  //     extras: undefined,
  //     logout: jest.fn(),
  //     pagination: {
  //       limit: 10,
  //       offset: 0,
  //       totalPages: 1,
  //       totalCount: 3,
  //       pageNum: 1,
  //     },
  //   };
  //   const wrapper = shallow(<ManageMealPage {...props} />, reactrouter.get());
  //   const onTopSpy = jest.spyOn(wrapper.instance(), 'onTop');
  //   wrapper.instance().onTop();
  //   expect(onTopSpy).toHaveBeenCalled();
  // });

  it('should call onSelectOption', () => {
    const wrapper = setup();
    const event = {
      target: {
        parentNode: {
          value: 4,
        },
      },
    };
    const onSelectOptionSpy = jest.spyOn(wrapper.instance(), 'onSelectOption');
    wrapper.instance().onSelectOption(event);
    expect(onSelectOptionSpy).toHaveBeenCalled();
  });

  it('should update extrasList state when onSelectDeleteBtn is called', () => {
    const wrapper = setup();
    wrapper.setState({
      extrasList: [{ key: 4 }, { key: 5 }, { key: 6 }],
      extrasTopList: ['beans'],
      selectValues: [{ key: 4 }, { key: 5 }],
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        parentNode: { getAttribute: jest.fn() },
      },
    };
    const nodeParent = jest.spyOn(event.target.parentNode, 'getAttribute');
    nodeParent.mockReturnValue(4);
    const onSelectDeleteSpy = jest.spyOn(wrapper.instance(), 'onSelectDeleteBtn');
    wrapper.instance().onSelectDeleteBtn(event, 'goes');
    expect(onSelectDeleteSpy).toHaveBeenCalled();
    expect(wrapper.state('selectValues')).toEqual([{ key: 5 }]);
    expect(wrapper.state('extrasList')).toEqual([{ key: 5 }, { key: 6 }]);
    expect(wrapper.state('extrasTopList')).toEqual(['beans']);
  });

  it('should update extrasTopList state when onSelectDeleteBtn is called', () => {
    const wrapper = setup();
    wrapper.setState({
      extrasList: [{ key: 4 }, { key: 5 }, { key: 6 }],
      extrasTopList: [{ key: 4 }, { key: 5 }, { key: 6 }],
      selectValues: [{ key: 4 }, { key: 5 }],
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        parentNode: { getAttribute: jest.fn() },
      },
    };
    const nodeParent = jest.spyOn(event.target.parentNode, 'getAttribute');
    nodeParent.mockReturnValue(4);
    const onSelectDeleteSpy = jest.spyOn(wrapper.instance(), 'onSelectDeleteBtn');
    wrapper.instance().onSelectDeleteBtn(event, 'top');
    expect(onSelectDeleteSpy).toHaveBeenCalled();
    expect(wrapper.state('selectValues')).toEqual([{ key: 5 }]);
    expect(wrapper.state('extrasList')).toEqual([{ key: 4 }, { key: 5 }, { key: 6 }]);
    expect(wrapper.state('extrasTopList')).toEqual([{ key: 5 }, { key: 6 }]);
  });

  it('should update state when onUpdate is called', () => {
    const wrapper = setup();
    wrapper.setState({
      meal: mealArray[0],
      updatedMeal: {},
      selectValues: [{ id: 7, key: 4 }, { id: 9, key: 5 }],
    });
    const event = {
      preventDefault: jest.fn(),
    };
    const onUpdateSpy = jest.spyOn(wrapper.instance(), 'onUpdate');
    wrapper.instance().onUpdate(event);
    expect(onUpdateSpy).toHaveBeenCalled();
    expect(wrapper.state('updatedMeal')).toEqual({ id: 54, extraIds: [7, 9] });
  });

  it('should update state when onSubmit is called', () => {
    const wrapper = setup();
    wrapper.setState({
      meal: mealArray[0],
      updatedMeal: {},
      selectValues: [{ id: 7, key: 4 }, { id: 9, key: 5 }],
    });
    const event = {
      preventDefault: jest.fn(),
    };
    const newMeal = mealArray[0];
    newMeal.extraIds = [7, 9];
    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalled();
    expect(wrapper.state('meal')).toEqual(newMeal);
  });
  // it('It renders Tab', () => {
  //   const props = {
  //     meals: mealArray,
  //     saveMeal: jest.fn(),
  //     deleteMeal: jest.fn(),
  //     loadMeal: jest.fn(),
  //     extras: extraArray,
  //   };
  //   const wrapper = mount(<Provider store={store}><ManageMealPage {...props} /></Provider>, reactrouter.get());
  //   expect(wrapper.find('Tab').length).toEqual(1);
  //   expect(wrapper.find('.item').length).toEqual(3);
  //   expect(wrapper.find('Drawer').length).toEqual(1);
  // });
  // it('should call the submit function', () => {
  //   const wrapper = setup();
  //   const handleSaveSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
  //   const event = {
  //     preventDefault: jest.fn(),
  //   };
  //   wrapper.instance().onSubmit(event);
  //   // const submitButton = wrapper.find('button');
  //   // submitButton.simulate('click');
  //   expect(handleSaveSpy).toHaveBeenCalled();
  //   wrapper.unmount();
  // });
});
