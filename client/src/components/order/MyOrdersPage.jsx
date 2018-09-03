import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import { loadOrders } from '../../actions/orderActions';
import UserNavBar from '../common/UserNavBar';
import MyOrderList from './MyOrdersList';
import '../../assets/styles/myorders.css';

class MyOrdersPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.loadOrders();
  }
  
  render() {
    // const { menu } = this.state;
    const { orders } = this.props;
    return (
      <div>
        <UserNavBar />
        <h2>My Orders</h2>
        <MyOrderList orders={orders} />
      </div>
    );
  }
};

MyOrdersPage.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  // menu: PropTypes.shape({
  //   success: PropTypes.bool.isRequired,
  //   message: PropTypes.string.isRequired,
  //   meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // })
  //   .isRequired,
  loadOrders: PropTypes.func.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ loadOrders }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  orders: state.orderReducer,
});

// const MyOrdersPageWithCSS = CSSModules(MyOrdersPage, styles, { allowMultiple: true });
export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersPage);
