import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer } from 'antd';
import { loadOrders, updateOrder } from '../../actions/orderActions';
import { loadMeal } from '../../actions/mealActions';
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
      meal: {},
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
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.props.loadMeal();
    this.props.loadOrders();
    this.updatePredicate();
    window.addEventListener('resize', this.updatePredicate);
    // setTimeout(() => {
    //   this.props.loadMeal();
    // }, 5000);
    console.log(this.state.meals);
    console.log(this.props.meal);
  }

  onCloseDrawer() {
    if (!this.state.saving) {
      const x = document.getElementsByClassName('checkbox');
      const y = document.getElementsByClassName('menu-modalextra-qty');
      console.log(y);
      for (let i = 0; i < x.length; i += 1) {
        setTimeout(() => {
        // console.log(x[i].querySelector("input[type='checkbox']").checked);
          if (x[i].querySelector("input[type='checkbox']").checked) {
          // console.log(x[i].querySelector("input[type='checkbox']").checked);
            console.log(y[i].value);
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

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 960 });
  }

  myOrder (currentOrder) {
    const currMeal = this.props.meal.find( meal => meal.id === currentOrder.mealId);
    this.setState({ meal: currMeal });
    this.showDrawer();
    this.setState({ orderMeal: currentOrder.Meal, basePrice: currentOrder.Meal.price, totalPrice: currentOrder.Meal.price, order: currentOrder});
    const newExtraStatus = [];
    currMeal.extras.forEach( (ext) => {
      newExtraStatus.push({ isChecked: false, qty: 1, extra: ext, key: ext.id } );
      const ordered = currentOrder.extras.find( (extr) => extr.OrderExtra.extraId === ext.id);
      // const ordered = currentOrder.extras.find( (extr) => extr.title === ext.title);
      if(ordered) {
        var x = document.getElementsByClassName(`extra-${ordered.OrderExtra.extraId}`);
        setTimeout(() => {
          const cb =(x[0].getElementsByClassName("checkbox")[0].querySelector("input[type='checkbox']"));
          cb.parentElement.click();
          x[0].getElementsByClassName('menu-modalextra-qty-grid')[0].firstChild.value = ordered.OrderExtra.quantity;
          const event = new Event('input', { bubbles: true })
          x[0].getElementsByClassName('menu-modalextra-qty-grid')[0].firstChild.dispatchEvent(event)
          console.log(x[0].getElementsByClassName('menu-modalextra-qty-grid')[0].firstChild);
        }, 1000);
      }
    });
    this.setState({ extraStatus: newExtraStatus });
  }

  // async onSave(e) {
  //   e.preventDefault();
  //   const extrasInfo = this.state.extraStatus.filter(extra => extra.isChecked === true);
  //   let extraIds = [];
  //   let extraQtys = [];
  //   extrasInfo.forEach(ext => extraIds.push(ext.extra.id));
  //   extrasInfo.forEach(ext => extraQtys.push(ext.qty));
  //   this.setState({ saving: true });
  //   await this.props.saveOrder({
  //     mealId: this.state.meal.id,
  //     extraIds,
  //     qtys: extraQtys,
  //     address: 'dsffsfgfsfvfsvfjysvfbgctf',
  //   });
  //   this.onCloseDrawer();
  //   this.redirect();
  // }

  onSave(e) {
    e.preventDefault();
    const extrasInfo = this.state.extraStatus.filter(extra => extra.isChecked === true);
    // console.log(this.state.extraStatus);
    let extraIds = [];
    let extraQtys = [];
    extrasInfo.forEach(ext => extraIds.push(ext.extra.id));
    extrasInfo.forEach(ext => extraQtys.push(ext.qty));
    // console.log(extraIds);
    // console.log(extraQtys);
    this.setState({ saving: true });
    this.props.updateOrder({
      id: this.state.order.id,
      extraIds,
      qtys: extraQtys,
    });
    // console.log(this.state.saving);
    this.onCloseDrawer();
    this.redirect();
  }

  goesWith(mealExtras) {
    // console.log(mealExtras);
    if (mealExtras !== undefined) {
      // console.log(mealExtras.filter(extra => extra.category === 'GoesWith'));
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
    // console.log(key);
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

  handleChecked(event, key, extra, extraQuantity) {
    const checked = this.state.extraStatus;
    const selectedExt = this.state.selectedExtras;
    const extStatPosition = checked.findIndex(extraStat => extraStat.key === key);
    let totalMealPrice = this.state.totalPrice;
    if (checked[extStatPosition].isChecked === false) {
      selectedExt.push(extra);
      totalMealPrice += (extra.price * extraQuantity); // If checked, add extra price
    } else {
      selectedExt.splice(extStatPosition, 1);
      totalMealPrice -= (extra.price * extraQuantity); // If unchecked, sub extra price
    }
    // checked[key].isChecked = !checked[key].isChecked;
    checked[extStatPosition].isChecked = !checked[extStatPosition].isChecked;
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
    const { orders, meal } = this.props;
    const { isDesktop } = this.state;
    return (
      <div>
        <UserNavBar />
        <div className="cust-ord-header">
          {isDesktop ? (
            <h2>My Orders</h2>) : null
          }
          
        </div>
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
const mapDispatchToProps = dispatch => bindActionCreators({ loadOrders, updateOrder, loadMeal }, dispatch);

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
