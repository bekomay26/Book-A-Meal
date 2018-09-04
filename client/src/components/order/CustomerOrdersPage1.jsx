import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer } from 'antd';
import { loadOrders } from '../../actions/orderActions';
import { loadOneMeal, loadMeal } from '../../actions/mealActions';
import UserNavBar from '../common/UserNavBar';
import '../../assets/styles/myorders.css';
import CustomerOrdersList from './CustomerOrdersList';
import OrderForm from './OrderForm';

class CustomerOrdersPage extends Component {
  constructor(props, context) {
    super(props, context);
    // this.props.loadMeal();
    // console.log(this.props.meal);
    this.state = {
      // meal: {},
      meals: this.props.meal,
      order: {},
      orderMeal: {},
      extraQty: 1,
      extraStatus: [],
      selectedExtras: [],
      saving: false,
      basePrice: 0,
      totalPrice: 0,
      visible: false,
      isDesktop: false,
      visibleSideBar: false,
    };
    this.onSave = this.onSave.bind(this);
    this.myOrder = this.myOrder.bind(this);
    this.goesWith = this.goesWith.bind(this);
    this.onTop = this.onTop.bind(this);
    this.onQtyChange = this.onQtyChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onCloseDrawer = this.onCloseDrawer.bind(this);
    this.extraOrdered = this.extraOrdered.bind(this);
  }

  async componentWillMount() {
    await this.props.loadMeal();
    this.setState({
      meals: this.props.meal,
    });
  }

  componentDidMount() {
    this.props.loadOrders();
    
  }

  onCloseDrawer() {
    const x = document.getElementsByClassName('checkbox');
    console.log(x);
    for (let i = 0; i < x.length; i += 1) {
      setTimeout(() => {
      // console.log(x[i].querySelector("input[type='checkbox']").checked);
        if (x[i].querySelector("input[type='checkbox']").checked) {
        // console.log(x[i].querySelector("input[type='checkbox']").checked);
          x[i].querySelector("input[type='checkbox']").parentElement.click();
        }
      }, 1000);
    }
    this.setState({
      visible: false,
    });
  }

  async myOrder (currentOrder) {
    await this.showDrawer();
    await this.props.loadOneMeal(currentOrder.mealId);
    console.log(this.props.meal);
    console.log(this.state.meals);
    this.setState({ orderMeal: currentOrder.Meal, basePrice: currentOrder.Meal.price, totalPrice: currentOrder.Meal.price, order: currentOrder});
    const currMeal = this.state.meals.find( meal => meal.id === currentOrder.mealId);
    const newExtraStatus = [];
    currMeal.extras.forEach( async (ext) => {
      newExtraStatus.push({ isChecked: false, qty: 1, extra: ext} );
      console.log(currentOrder.extras);
      console.log(ext);
      const ordered = currentOrder.extras.find( (extr) => extr.title === ext.title);
      console.log(ordered);
      // if(currentOrder.extras.includes(ext)) {
      if(ordered) {
        // newExtraStatus[newExtraStatus.length - 1] = {isChecked: true, qty: ordered.OrderExtra.quantity || 1, extra: ext}
        console.log(`extra-${ordered.OrderExtra.extraId}`);
        var x = document.getElementsByClassName(`extra-${ordered.OrderExtra.extraId}`);
        // var y = x[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].nodeName;
        // var x = document.getElementById('extra-3');
        // var y = document.getElementsByClassName("dfdf");
        // console.log(x[0]);
        // console.log(y);
        
        setTimeout(() => {
          // let event = new MouseEvent('click', {
          //   view: window,
          //   bubbles: true,
          //   cancelable: true
          // });
        // var x = document.getElementsByClassName(`extra-${ordered.OrderExtra.orderId}`);
          console.log(x);
          console.log(x[0]);
          // event.stopPropagation();
          // event.preventDefault();
          // event.stopImmediatePropagation();
          const cb =(x[0].getElementsByClassName("checkbox")[0].querySelector("input[type='checkbox']"));
          // cb.removeEventListener;
          // console.log(cb.parentElement.parentElement);
          cb.parentElement.click();
          // event.stopPropagation();
          // !cb.parentElement.dispatchEvent(event);
          // event.stopImmediatePropagation();
          // x[0].getElementsByClassName("checkbox")[0].querySelector("input[type='checkbox']").checked = true;
          // console.log(x);
          // console.log(x[0].getElementsByClassName("checkbox")[0].querySelector("input[type='checkbox']"));
        }, 1000);
      }
    });
    console.log(newExtraStatus);
    await this.setState({ extraStatus: newExtraStatus });
  }

  async onSave(e) {
    e.preventDefault();
    const extrasInfo = this.state.extraStatus.filter(extra => extra.isChecked === true);
    let extraIds = [];
    let extraQtys = [];
    extrasInfo.forEach(ext => extraIds.push(ext.extra.id));
    extrasInfo.forEach(ext => extraQtys.push(ext.qty));
    this.setState({ saving: true });
    await this.props.saveOrder({
      mealId: this.state.meal.id,
      extraIds,
      qtys: extraQtys,
      address: 'dsffsfgfsfvfsvfjysvfbgctf',
    });
    this.onCloseDrawer();
    this.redirect();
  }

  goesWith(mealExtras) {
    if (mealExtras !== undefined) {
      console.log(mealExtras.filter(extra => extra.category === 'GoesWith'));
      return mealExtras.filter(extra => extra.category === 'GoesWith');
    } else
      return []
  }
  onTop(mealExtras) {
    if (mealExtras !== undefined)
      return mealExtras.filter(extra => extra.category === 'OnTop');
    else
      return []
  }

  clearExtrasFields() {
    this.setState({
      extraStatus: [],
      meal: {},
    });
  }

  onQtyChange(event, key, extraPrice) {
    console.log(key);
    const status = this.state.extraStatus;
    status[key].qty = parseInt(event.target.value, 10);
    status[key].price = extraPrice * (status[key].qty);
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

  handleChecked(event, key, extra, extraQuantity) {
    console.log(event);
    console.log(key);
    console.log(extra);
    console.log(extraQuantity);
    const checked = this.state.extraStatus;
    console.log(checked);
    const selectedExt = this.state.selectedExtras;
    let totalMealPrice = this.state.totalPrice;
    if (checked[key].isChecked === false) {
      selectedExt.push(extra);
      totalMealPrice += (extra.price * extraQuantity); // If checked, add extra price
      console.log(totalMealPrice);
    } else {
      selectedExt.splice(key, 1);
      totalMealPrice -= (extra.price * extraQuantity); // If unchecked, sub extra price
      console.log(totalMealPrice);
    }
    checked[key].isChecked = !checked[key].isChecked;
    this.setState({ extraStatus: checked, selectedExtras: selectedExt, totalPrice: totalMealPrice });
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  extraOrdered(extra) {
    order.extras.includes(extra);
  }

  render() {
    // console.log(this.props.meal);
    // const { menu } = this.state;
    const { orders } = this.props;
    return (
      <div>
        <UserNavBar />
        <h2>My Orders</h2>
        <CustomerOrdersList orders={orders} selected={this.myOrder} />
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
            meal={this.props.meal}
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
            extraOrdered={this.extraOrdered}
          />
        </Drawer>
      </div>
    );
  }
}

CustomerOrdersPage.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadOrders: PropTypes.func.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ loadOrders, loadOneMeal, loadMeal }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  orders: state.orderReducer,
  meal: state.mealReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersPage);
