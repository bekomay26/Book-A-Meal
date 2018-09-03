import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer } from 'antd';
import { loadOneMeal } from '../../actions/mealActions';
import UserNavBar from '../common/UserNavBar';
import '../../assets/styles/myorders.css';
import OrderForm from './OrderForm';

class CustomerOrderDrawer extends Component {
  constructor(props, context) {
    super(props, context);
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
    // this.myOrder = this.myOrder.bind(this);
  }

  componentDidMount() {
    console.log(this.props.meal.id);
    this.props.loadOneMeal(this.props.meal.id);
    console.log(this.state.mealds);
    console.log(this.props.meal);
  }

  // async myOrder (currentOrder) {
  //   this.showDrawer();
  //   console.log(xx);
  //   await this.props.loadOneMeal(currentOrder.mealId);
  //   console.log(this.props.meal);
  //   console.log(this.state.meals);
  //   this.setState({ orderMeal: currentOrder.Meal, basePrice: currentOrder.Meal.price, totalPrice: currentOrder.Meal.price, order: currentOrder});
  //   const currMeal = this.state.meals.find( meal => meal.id === currentOrder.mealId);
  //   const newExtraStatus = [];
  //   currMeal.extras.forEach(async (ext) => {
  //     newExtraStatus.push({ isChecked: false, qty: 1, extra: ext} );
  //     const ordered = currentOrder.extras.find( (extr) => extr.title === ext.title);
  //     if (ordered) {
  //       setTimeout(() => {
  //         const cb =(x[0].getElementsByClassName("checkbox")[0].querySelector("input[type='checkbox']"));
  //         cb.parentElement.click();
  //       }, 1000);
  //     }
  //   });
  //   await this.setState({ extraStatus: newExtraStatus });
  // }

  render() {
    console.log(this.props.meal);
    // const { menu } = this.state;
    return (
      <Drawer
        title="My Order"
        width={400}
        placement="right"
        onClose={this.props.onCloseDrawer}
        maskClosable={false}
        visible={this.props.visible}
        style={{
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: 53,
        }}
      >
        <OrderForm
          meal={this.props.meal}
          order={this.props.order}
          orderedMeal={this.props.orderMeal}
          goesWith={this.props.goesWith}
          extras={this.props.extras}
          onQtyChange={this.props.onQtyChange}
          extraStatus={this.props.extraStatus}
          handleChecked={this.props.handleChecked}
          totalMealPrice={this.props.totalMealPrice}
          onSave={this.props.onSave}
          onClose={this.props.onClose}
          saving={this.props.saving}
          extraOrdered={this.props.extraOrdered}
        />
      </Drawer>
    );
  }
}

CustomerOrderDrawer.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadOneMEal: PropTypes.func.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ loadOneMeal }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  meal: state.mealReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderDrawer);
