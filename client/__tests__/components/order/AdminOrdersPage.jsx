import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ConnectedAdminOrdersPage, { AdminOrdersPage, mapStateToProps, mapDispatchToProps } from '../../../src/components/order/AdminOrdersPage';
import { getOrdersResponse } from '../../__mocks__/mockOrders';
import { getMealsResponse } from '../../__mocks__/mockMeal';
import { getExtrasResponse } from '../../__mocks__/mockExtras';

describe('Admin Order Page Component Test Suite', () => {
  let props;
  let wrapper;
  const orderArray = getOrdersResponse.orders;
  const mealArray = getMealsResponse.meals;
  const extraArray = getExtrasResponse.extras;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    orderReducer: {
      orders: {},
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
      orders: orderArray,
      loadMeal: jest.fn(),
      loadOrders: jest.fn(),
      updateOrder: jest.fn(),
      filterOrders: jest.fn(),
      pagination: {
        limit: 10,
        offset: 0,
        totalPages: 1,
        totalCount: 3,
        pageNum: 1,
      },
      meals: mealArray,
    };
  });

  const setup = (type) => {
    if (type === 'shallow') {
      return shallow(<AdminOrdersPage {...props} />);
    }
    return mount(<Provider store={store}><ConnectedAdminOrdersPage {...props} /></Provider>, reactrouter.get());
  };

  it('renders without crashing', () => {
    wrapper = setup('shallow');
    expect(wrapper).toBeDefined();
  });

  it('should update state when handleClick is called', () => {
    const event = {
      target: {
        name: 'click',
      },
    };
    const titleProps = {
      index: 4,
      order: {
        name: 'yam',
        price: 8700,
      },
    };
    wrapper.setState({
      activeIndex: 0,
      order: {
        name: 'eba',
        price: 900,
      },
    });
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');
    wrapper.instance().handleClick(event, titleProps);
    expect(handleClickSpy).toHaveBeenCalled();
    expect(wrapper.state('activeIndex')).toEqual(4);
    expect(wrapper.state('order')).toEqual({
      name: 'yam',
      price: 8700,
    });
  });

  it('should update state when handleClick is called', () => {
    const event = {
      target: {
        name: 'click',
      },
    };
    const titleProps = {
      index: 0,
      order: {
        name: 'yam',
        price: 8700,
      },
    };
    wrapper.setState({
      activeIndex: 0,
      order: {
        name: 'eba',
        price: 900,
      },
    });
    const handleClickSpy = jest.spyOn(wrapper.instance(), 'handleClick');
    wrapper.instance().handleClick(event, titleProps);
    expect(handleClickSpy).toHaveBeenCalled();
    expect(wrapper.state('activeIndex')).toEqual(-1);
    expect(wrapper.state('order')).toEqual({
      name: 'yam',
      price: 8700,
    });
  });

  it('should update state when updateOrderStatus is called', () => {
    // const event = new Event('click');
    // jest.spyOn(event, 'preventDefault');
    wrapper.setState({
      order: {
        name: 'eba',
        price: 900,
      },
    });
    const updateOrderStatusSpy = jest.spyOn(wrapper.instance(), 'updateOrderStatus');
    wrapper.instance().updateOrderStatus();
    expect(updateOrderStatusSpy).toHaveBeenCalled();
    expect(wrapper.state('order')).toEqual({
      name: 'eba',
      price: 900,
      status: 'Completed',
    });
  });

  it('should call renderCompleteButton', () => {
    const renderCompleteSpy = jest.spyOn(wrapper.instance(), 'renderCompleteButton');
    wrapper.instance().renderCompleteButton('Pending');
    expect(renderCompleteSpy).toHaveBeenCalled();
  });

  it('should call renderCompleteButton', () => {
    const renderCompleteSpy = jest.spyOn(wrapper.instance(), 'renderCompleteButton');
    wrapper.instance().renderCompleteButton('Completed');
    expect(renderCompleteSpy).toHaveBeenCalled();
  });

  it('should call updateFilterInputState', () => {
    const event = {
      target: {
        name: 'title',
        value: "fola's eba",
      },
    };
    wrapper.setState({
      filterObj: {},
    });
    const filterInputSpy = jest.spyOn(wrapper.instance(), 'updateFilterInputState');
    wrapper.instance().updateFilterInputState(event);
    expect(filterInputSpy).toHaveBeenCalled();
  });

  it('should call onSubmit function and update state', () => {
    wrapper = setup('shallow');
    wrapper.setState({ filtered: false, queryString: '' });
    // const nameSpy = jest.spyOn(document, 'getElementById');
    // nameSpy.mockReturnValue({ value: 'fish', checked: true });
    const rangeSpy = jest.spyOn(document, 'getElementsByClassName');
    const nodeDoc = {
      getAttribute: jest.fn(),
    };
    jest.spyOn(nodeDoc, 'getAttribute').mockReturnValue(900);
    rangeSpy.mockReturnValue([nodeDoc, nodeDoc]);

    const startSpy = jest.spyOn(document, 'getElementById');
    const startDoc = {
      value: 'fish',
      checked: true,
      getElementsByClassName: jest.fn(),
    };
    startSpy.mockReturnValue(startDoc);
    const endSpy = jest.spyOn(startDoc, 'getElementsByClassName');
    const endDoc = {
      value: 7,
    };
    endSpy.mockReturnValue([endDoc, endDoc]);

    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit();
    expect(onSubmitSpy).toHaveBeenCalled();
    expect(wrapper.state('filtered')).toEqual(true);
    expect(wrapper.state('queryString'))
      .toEqual('fromDate=7&toDate=7&totalPrice=900&totalPrice=900&mealTitle=fish&statuses=Cancelled&statuses=Pending&statuses=Completed');
  });

  it('should call onSubmit function and update state', () => {
    wrapper = setup('shallow');
    wrapper.setState({ filtered: false, queryString: '' });
    const rangeSpy = jest.spyOn(document, 'getElementsByClassName');
    const nodeDoc = {
      getAttribute: jest.fn(),
    };
    jest.spyOn(nodeDoc, 'getAttribute').mockReturnValue(900);
    rangeSpy.mockReturnValue([nodeDoc, nodeDoc]);

    const startSpy = jest.spyOn(document, 'getElementById');
    const startDoc = {
      value: 'fish',
      checked: false,
      getElementsByClassName: jest.fn(),
    };
    startSpy.mockReturnValue(startDoc);
    const endSpy = jest.spyOn(startDoc, 'getElementsByClassName');
    const endDoc = {
      value: 7,
    };
    endSpy.mockReturnValue([endDoc, endDoc]);

    const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit();
    expect(onSubmitSpy).toHaveBeenCalled();
    expect(wrapper.state('filtered')).toEqual(true);
    expect(wrapper.state('queryString'))
      .toEqual('fromDate=7&toDate=7&totalPrice=900&totalPrice=900&mealTitle=fish');
  });

  it('Updates call getStatuscolor', () => {
    wrapper = setup('shallow');
    const getStatuscolorSpy = jest.spyOn(wrapper.instance(), 'getStatuscolor');
    wrapper.instance().getStatuscolor('Pending');
    expect(getStatuscolorSpy).toHaveBeenCalled();
  });

  it('Updates call getStatuscolor', () => {
    wrapper = setup('shallow');
    const getStatuscolorSpy = jest.spyOn(wrapper.instance(), 'getStatuscolor');
    wrapper.instance().getStatuscolor('Completed');
    expect(getStatuscolorSpy).toHaveBeenCalled();
  });

  it('Updates call getStatuscolor', () => {
    wrapper = setup('shallow');
    const getStatuscolorSpy = jest.spyOn(wrapper.instance(), 'getStatuscolor');
    wrapper.instance().getStatuscolor('Cancelled');
    expect(getStatuscolorSpy).toHaveBeenCalled();
  });

  it('Updates call getStatuscolor', () => {
    wrapper = setup('shallow');
    const getStatuscolorSpy = jest.spyOn(wrapper.instance(), 'getStatuscolor');
    wrapper.instance().getStatuscolor('Nothing');
    expect(getStatuscolorSpy).toHaveBeenCalled();
  });

  it('Updates state when handlePageChange is called', () => {
    wrapper = setup('shallow');
    wrapper.setProps({ loadMeal: jest.fn() });
    wrapper.setState({ filtered: true, currentPage: 1 });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');
    wrapper.instance().handlePageChange(4);
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('currentPage')).toEqual(4);
  });

  it('Updates state when handlePageChange is called', () => {
    wrapper = setup('shallow');
    wrapper.setProps({ loadMeal: jest.fn() });
    wrapper.setState({ filtered: false, currentPage: 1 });
    const handleSaveSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');
    wrapper.instance().handlePageChange(4);
    expect(handleSaveSpy).toHaveBeenCalled();
    expect(wrapper.state('currentPage')).toEqual(4);
  });

  it('should update visible state when showDrawer is called', () => {
    wrapper = setup('shallow');
    wrapper.setState({ visible: false });
    const showDrawerSpy = jest.spyOn(wrapper.instance(), 'showDrawer');
    wrapper.instance().showDrawer();
    expect(showDrawerSpy).toHaveBeenCalled();
    expect(wrapper.state('visible')).toEqual(true);
  });

  it('should update visible state when onCloseDrawer is called', () => {
    wrapper = setup('shallow');
    wrapper.setState({ visible: true });
    const getCloseDrawerSpy = jest.spyOn(wrapper.instance(), 'onCloseDrawer');
    wrapper.instance().onCloseDrawer();
    expect(getCloseDrawerSpy).toHaveBeenCalled();
    expect(wrapper.state('visible')).toEqual(false);
  });
});
