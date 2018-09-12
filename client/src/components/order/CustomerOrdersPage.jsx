import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Drawer } from 'antd';
import { loadOrders, updateOrder, deleteOrder } from '../../actions/orderActions';
import { loadMeal } from '../../actions/mealActions';
import { logout } from '../../actions/authActions';
import UserNavBar from '../common/UserNavBar';
import '../../assets/styles/myorders.css';
import CustomerOrdersList from './CustomerOrdersList';
import OrderForm from './OrderForm';

export class CustomerOrdersPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      meal: {},
      order: {},
      orderMeal: {},
      extraStatus: [],
      selectedExtras: [],
      saving: false,
      basePrice: 0,
      totalPrice: 0,
      visible: false,
      isDesktop: false,
      editable: true,
    };
    this.onSave = this.onSave.bind(this);
    this.myOrder = this.myOrder.bind(this);
    this.goesWith = this.goesWith.bind(this);
    this.onTop = this.onTop.bind(this);
    this.onQtyChange = this.onQtyChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onCloseDrawer = this.onCloseDrawer.bind(this);
    // this.extraOrdered = this.extraOrdered.bind(this);
    this.updatePredicate = this.updatePredicate.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  componentDidMount() {
    this.props.loadMeal();
    this.props.loadOrders(40, 0);
    this.updatePredicate();
    window.addEventListener('resize', this.updatePredicate);
  }

  async onCloseDrawer() {
    if (!this.state.saving) {
      const x = document.getElementsByClassName('checkbox');
      const y = document.getElementsByClassName('menu-modalextra-qty');
      for (let i = 0; i < x.length; i += 1) {
        setTimeout(() => {
          if (x[i].querySelector("input[type='checkbox']").checked) {
            y[i].value = 1;
            x[i].querySelector("input[type='checkbox']").parentElement.click();
          }
        }, 1000);
      }
      this.setState({
        visible: false,
      });
    }
  }


  onQtyChange(event, key, extraPrice) {
    const status = this.state.extraStatus;
    const extStatPosition = status.findIndex(extraStat => extraStat.key === key);
    status[extStatPosition].qty = parseInt(event.target.value, 10);
    status[extStatPosition].price = extraPrice * (status[extStatPosition].qty);
    let totalMealPrice = this.state.totalPrice;
    let mealPrice = this.state.basePrice;
    for (let i = 0; i < status.length; i += 1) {
      if (status[i].isChecked === true) {
        mealPrice += status[i].price;
      }
    }
    totalMealPrice = mealPrice;
    this.setState({ extraStatus: status, totalPrice: totalMealPrice });
  }

  onTop(mealExtras) {
    if (mealExtras !== undefined) {
      return mealExtras.filter(extra => extra.category === 'OnTop');
    }
    return [];
  }

  onSave(e) {
    e.preventDefault();
    const extrasInfo = this.state.extraStatus.filter(extra => extra.isChecked === true);
    const extraIds = [];
    const extraQtys = [];
    extrasInfo.forEach(ext => extraIds.push(ext.extra.id));
    extrasInfo.forEach(ext => extraQtys.push(ext.qty));
    this.setState({ saving: true });
    this.props.updateOrder({
      id: this.state.order.id,
      extraIds,
      qtys: extraQtys,
    });
    this.onCloseDrawer();
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 960 });
  }

  myOrder(currentOrder) {
    // Determine editability
    const moment = require('moment-timezone');
    const currentTime = moment.tz(new Date(), 'America/Danmarkshavn');
    const creaTime = moment.tz(currentOrder.createdAt, 'America/Danmarkshavn');
    const timeElapsed = (moment.duration(currentTime.diff(creaTime))).asMinutes();
    if (timeElapsed > 15) {
      this.setState({
        editable: false,
      });
    }

    const currMeal = this.props.meal.find(meal => meal.id === currentOrder.mealId);
    this.setState({ meal: currMeal, saving: false });
    this.showDrawer();
    this.setState({
      orderMeal: currentOrder.Meal,
      basePrice: currentOrder.Meal.price,
      totalPrice: currentOrder.Meal.price,
      order: currentOrder,
    });
    const newExtraStatus = [];
    currMeal.extras.forEach((ext) => {
      newExtraStatus.push({
        isChecked: false,
        qty: 1,
        extra: ext,
        key: ext.id,
      });
      const ordered = currentOrder.extras.find(extr => extr.OrderExtra.extraId === ext.id);
      if (ordered) {
        const x = document.getElementsByClassName(`extra-${ordered.OrderExtra.extraId}`);
        setTimeout(async () => {
          const cb = (x[0].getElementsByClassName('checkbox')[0].querySelector("input[type='checkbox']"));
          await cb.parentElement.click();
          x[0].getElementsByClassName('menu-modalextra-qty-grid')[0].firstChild.value = ordered.OrderExtra.quantity;
          const event = new Event('input', { bubbles: true });
          x[0].getElementsByClassName('menu-modalextra-qty-grid')[0].firstChild.dispatchEvent(event);
        }, 1000);
      }
    });
    this.setState({ extraStatus: newExtraStatus });
  }

  cancelOrder(orderId) {
    this.props.deleteOrder(orderId);
  }

  goesWith(mealExtras) {
    if (mealExtras !== undefined) {
      return mealExtras.filter(extra => extra.category === 'GoesWith');
    }
    return [];
  }

  clearExtrasFields() {
    this.setState({
      extraStatus: [],
      meal: {},
    });
  }


  handleChecked(event, key, extra, extraQuantity) {
    const checked = this.state.extraStatus;
    const selectedExt = this.state.selectedExtras;
    const extStatPosition = checked.findIndex(extraStat => extraStat.key === key);
    let totalMealPrice = this.state.totalPrice;
    if (checked[extStatPosition].isChecked === false) {
      selectedExt.push(extra);
      totalMealPrice += (extra.price * extraQuantity); // If checked, add extra price
    } else {
      const selectedExtPosition = selectedExt.findIndex(extraStat => extraStat.key === key);
      selectedExt.splice(selectedExtPosition, 1);
      totalMealPrice -= (extra.price * extraQuantity); // If unchecked, sub extra price
    }
    // checked[key].isChecked = !checked[key].isChecked;
    checked[extStatPosition].isChecked = !checked[extStatPosition].isChecked;
    this.setState({
      extraStatus: checked,
      selectedExtras: selectedExt,
      totalPrice: totalMealPrice,
    });
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  render() {
    const orders2 = [...this.props.orders];
    const orders = orders2.filter(ord => ord.Meal !== undefined);
    const { userName } = this.props;
    const { isDesktop } = this.state;
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return (
        <Redirect to={{
          pathname: '/login',
          state: { from: 'orders' },
        }}
        />
      );
    }
    return (
      <div>
        <UserNavBar
          logout={this.props.logout}
          isAuthenticated={isAuthenticated}
          userName={userName}
        />
        <div className="cust-ord-header">
          {isDesktop ? (
            <h2>My Orders</h2>) : null
          }
        </div>
        <CustomerOrdersList
          orders={orders}
          selected={this.myOrder}
          cancelOrder={this.cancelOrder}
        />
        <Drawer
          title="My Order"
          width={400}
          placement="right"
          onClose={this.onCloseDrawer}
          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <OrderForm
            meal={this.state.meal}
            order={this.state.order}
            orderedMeal={this.state.orderMeal}
            goesWith={this.goesWith}
            extras={this.onTop}
            onQtyChange={this.onQtyChange}
            extraStatus={this.state.extraStatus}
            handleChecked={this.handleChecked}
            totalMealPrice={this.state.totalPrice}
            onSave={this.onSave}
            onClose={this.onClose}
            saving={this.state.saving}
            editable={this.state.editable}
            // extraOrdered={this.extraOrdered}
          />
        </Drawer>
      </div>
    );
  }
}

CustomerOrdersPage.defaultProps = {
  userName: undefined,
  isAuthenticated: false,
};

CustomerOrdersPage.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadOrders: PropTypes.func.isRequired,
  loadMeal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  userName: PropTypes.string,
  deleteOrder: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  meal: PropTypes.any.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
export const mapDispatchToProps = dispatch => bindActionCreators({
  loadOrders, updateOrder, loadMeal, logout, deleteOrder,
}, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
export const mapStateToProps = state => ({
  orders: state.orderReducer.orders,
  pagination: state.orderReducer.pagination,
  meal: state.mealReducer.meals,
  isAuthenticated: state.authReducer.isAuthenticated,
  userName: state.authReducer.userName,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersPage);
