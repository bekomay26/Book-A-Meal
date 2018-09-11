import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedCustomerOrdersPage, { CustomerOrdersPage, mapStateToProps, mapDispatchToProps } from '../../../src/components/order/CustomerOrdersPage';
import { getOrdersResponse } from '../../__mocks__/mockOrders';
import { getMealsResponse } from '../../__mocks__/mockMeal';
import { getExtrasResponse } from '../../__mocks__/mockExtras';

describe('Customer Order Page Component Test Suite', () => {
  jest.useFakeTimers();
  let props;
  let wrapper;
  const orderArray = getOrdersResponse.orders;
  const mealArray = getMealsResponse.meals;
  const extraArray = getExtrasResponse.extras;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    orderReducer: {
      orders: orderArray,
      pagination: {},
    },
    mealReducer: {
      meals: mealArray,
      pagination: {},
    },
    authReducer: {
      isAuthenticated: true,
      isCaterer: true,
      userName: '',
    },
  });

  beforeEach(() => {
    props = {
      order: orderArray,
      loadMeal: jest.fn(),
      loadOrders: jest.fn(),
      updateOrder: jest.fn(),
      pagination: {
        limit: 10,
        offset: 0,
        totalPages: 1,
        totalCount: 3,
        pageNum: 1,
      },
      meal: mealArray,
    };
  });

  const setup = (type) => {
    if (type === 'shallow') {
      return shallow(<CustomerOrdersPage {...props} />);
    }
    return mount(<Provider store={store}><ConnectedCustomerOrdersPage {...props} /></Provider>, reactrouter.get());
  };

  it('renders without crashing', () => {
    wrapper = setup('shallow');
    expect(wrapper).toBeDefined();
  });

  it('should update visible state when onCloseDrawer is called', () => {
    // faketimeout is above
    wrapper = setup('shallow');
    wrapper.setState({ saving: false, visible: true });
    const spy = jest.spyOn(document, 'getElementsByClassName');
    const nodeDoc = {
      querySelector: jest.fn(),
    };
    const nodeDoc2 = {
      querySelector: jest.fn(),
    };
    spy.mockReturnValue([nodeDoc, nodeDoc, nodeDoc2]);
    const qSelector = jest.spyOn(nodeDoc, 'querySelector');
    const qSelector2 = jest.spyOn(nodeDoc2, 'querySelector');
    const nodeSelect = {
      checked: true,
      parentElement: {
        click: jest.fn(),
      },
    };
    const nodeSelect2 = {
      checked: false,
      parentElement: {
        click: jest.fn(),
      },
    };
    qSelector.mockReturnValue(nodeSelect);
    qSelector2.mockReturnValue(nodeSelect2);
    const getCloseDrawerSpy = jest.spyOn(wrapper.instance(), 'onCloseDrawer');
    wrapper.instance().onCloseDrawer();
    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(getCloseDrawerSpy).toHaveBeenCalled();
    expect(wrapper.state('visible')).toEqual(false);
    jest.runAllTimers();
  });

  it('should not update visible state when onCloseDrawer is called', () => {
    wrapper = setup('shallow');
    wrapper.setState({ saving: true, visible: true });
    const getCloseDrawerSpy = jest.spyOn(wrapper.instance(), 'onCloseDrawer');
    wrapper.instance().onCloseDrawer();
    expect(getCloseDrawerSpy).toHaveBeenCalled();
    expect(wrapper.state('visible')).toEqual(true);
  });

  it('should update state when myOrder is called', () => {
    wrapper = setup('shallow');
    const spy = jest.spyOn(document, 'getElementsByClassName');
    const nodeDoc = {
      getElementsByClassName: jest.fn(),
    };
    const docSelector = jest.spyOn(nodeDoc, 'getElementsByClassName');
    spy.mockReturnValue([nodeDoc, nodeDoc]);
    const nodeDoc2 = {
      querySelector: jest.fn(),
      firstChild: {
        value: 9,
        dispatchEvent: jest.fn(),
      },
    };
    const qSelector = jest.spyOn(nodeDoc2, 'querySelector');
    docSelector.mockReturnValue([nodeDoc2, nodeDoc2]);
    const nodeSelect = {
      checked: true,
      parentElement: {
        click: jest.fn(),
      },
    };
    qSelector.mockReturnValue(nodeSelect);
    // jest.runTimersToTime();
    wrapper.setState({
      meal: {},
      orderMeal: {},
      basePrice: 0,
      totalPrice: 0,
      order: {},
      extraStatus: [],
    });
    const myOrderSpy = jest.spyOn(wrapper.instance(), 'myOrder');
    wrapper.instance().myOrder(orderArray[0]);
    expect(myOrderSpy).toHaveBeenCalled();
    expect(wrapper.state('meal')).toEqual(mealArray[9]);
    expect(wrapper.state('orderMeal')).toEqual(orderArray[0].Meal);
    expect(wrapper.state('basePrice')).toEqual(orderArray[0].Meal.price);
    expect(wrapper.state('totalPrice')).toEqual(orderArray[0].Meal.price);
    expect(wrapper.state('extraStatus')).toEqual([
      {
        isChecked: false,
        qty: 1,
        extra: {
          id: 3,
          title: 'fish',
          category: 'GoesWith',
          price: 200,
        },
        key: 3,
      },
      {
        isChecked: false,
        qty: 1,
        extra: {
          id: 2,
          title: 'chicken',
          category: 'OnTop',
          price: 150,
        },
        key: 2,
      },
      {
        isChecked: false,
        qty: 1,
        extra: {
          id: 1,
          title: 'beef',
          category: 'GoesWith',
          price: 50,
        },
        key: 1,
      },
    ]);
    jest.runAllTimers();
  });

  it('should update state when onSave is called', () => {
    wrapper.setState({
      saving: false,
      extraStatus: [{ isChecked: true, extra: extraArray[0], key: 1 }, { isChecked: false, extra: extraArray[0], key: 1 }],
    });
    const event = {
      preventDefault: jest.fn(),
    };
    const onSaveSpy = jest.spyOn(wrapper.instance(), 'onSave');
    wrapper.instance().onSave(event);
    expect(onSaveSpy).toHaveBeenCalled();
    // expect(props.updateOrder).toHaveBeenCalled();
    expect(wrapper.state('saving')).toEqual(true);
  });

  it('should call goesWith', () => {
    const goesWithSpy = jest.spyOn(wrapper.instance(), 'goesWith');
    wrapper.instance().goesWith(extraArray);
    expect(goesWithSpy).toHaveBeenCalled();
  });

  it('should call onTop', () => {
    const onTopSpy = jest.spyOn(wrapper.instance(), 'onTop');
    wrapper.instance().onTop(extraArray);
    expect(onTopSpy).toHaveBeenCalled();
  });

  it('should call goesWith', () => {
    const goesWithSpy = jest.spyOn(wrapper.instance(), 'goesWith');
    wrapper.instance().goesWith();
    expect(goesWithSpy).toHaveBeenCalled();
  });

  it('should call onTop', () => {
    const onTopSpy = jest.spyOn(wrapper.instance(), 'onTop');
    wrapper.instance().onTop();
    expect(onTopSpy).toHaveBeenCalled();
  });

  it('should clear state fields when clearExtrasFields is called', () => {
    wrapper.setState({
      extraStatus: ['Pendinng'],
      meal: { title: 'fish' },
    });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'clearExtrasFields');
    wrapper.instance().clearExtrasFields();
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('extraStatus')).toEqual([]);
    expect(wrapper.state('meal')).toEqual({});
  });

  it('should call the quantity changed function', () => {
    wrapper.setState({
      meal: mealArray[0],
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
    wrapper.setState({
      meal: mealArray[0],
      selectedExtras: [],
      extraStatus: [
        {
          isChecked: true, extra: extraArray[0], key: 1, selectedExt: [],
        },
      ],
      totalPrice: 900,
    });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handleChecked');
    const event = {
      preventDefault: jest.fn(),
      target: { value: 1 },
    };
    wrapper.instance().handleChecked(event, 1, extraArray[0], 5);
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('totalPrice')).toEqual(650);
  });
  
  it('should call the handle unchecked function', () => {
    wrapper.setState({
      meal: mealArray[0],
      selectedExtras: [],
      extraStatus: [
        {
          isChecked: false, extra: extraArray[0], key: 1, selectedExt: [],
        },
      ],
      totalPrice: 450,
    });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handleChecked');
    const event = {
      preventDefault: jest.fn(),
      target: { value: 1 },
    };
    wrapper.instance().handleChecked(event, 1, extraArray[0], 5);
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('totalPrice')).toEqual(700);
  });

  it('should call the extraOrdered function', () => {
    const extraOrderedSpy = jest.spyOn(wrapper.instance(), 'extraOrdered');
    wrapper.instance().extraOrdered(extraArray[0]);
    expect(extraOrderedSpy).toHaveBeenCalled();
  });

  // mapState and dispatch were exported bcos of this test
  // it('should test mapStateToProps', () => {
  //   const initialState = {
  //     orders: [],
  //     pagination: 9,
  //     meal: {},
  //   };
  //   expect(mapStateToProps(initialState).pagination).toEqual(9);
  // });

  // it('should test mapDispatchToProps', () => {
  //   const dispatch = jest.fn();
  //   mapDispatchToProps(dispatch).loadOrders();
  //   expect(dispatch.mock.calls[0][0]).toEqual({ type: 'LOAD_ORDERS' });
  // });
  // it('doesnt render clickable icon when status is not Pending', () => {
  //   wrapper.setProps({ order: orderArray[0] });
  //   expect(wrapper.find('.fa-edit')).toHaveLength(0);
  // });

  // it('renders clickable icon when status is Pending', () => {
  //   expect(wrapper.find('.fa-edit')).toHaveLength(1);
  // });

  // it('calls selected when Edit button is clicked', () => {
  //   const editButton = wrapper.find('.edit').first();
  //   editButton.simulate('click');
  //   expect(props.selected).toHaveBeenCalled();
  // });
});
