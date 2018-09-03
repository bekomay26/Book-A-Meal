import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Accordion, Icon, Checkbox, Button, Form } from 'semantic-ui-react';
import { Drawer } from 'antd';
import { loadOrders, updateOrder } from '../../actions/orderActions';
import UserNavBar from '../common/UserNavBar';
import '../../assets/styles/adminorders.css';
import OrderList from './OrderList';
import AdminLayout from '../common/AdminLayout';
import FilterOrders from './FilterOrders';

class AdminOrdersPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: 0,
      order: {},
      visible: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateOrderStatus = this.updateOrderStatus.bind(this);
    this.getStatuscolor = this.getStatuscolor.bind(this);
    this.renderCompleteButton = this.renderCompleteButton.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onCloseDrawer = this.onCloseDrawer.bind(this);
    // this.getOrders = this.getOrders.bind(this);
  }

  componentDidMount() {
    this.props.loadOrders();
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { order } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex, order: order });
  }

  updateOrderStatus() {
    event.preventDefault();
    let { order } = this.state;
    order.status = 'Completed';
    this.setState({ order });
    console.log(this.state.order);
    this.props.updateOrder(this.state.order);
  }

  renderCompleteButton(orderStatus) {
    const completeButton = (<Button content="Complete Order" color="green" onClick={this.updateOrderStatus} />);
    if (orderStatus === 'Pending') {
      return completeButton;
    }
    return '';
  }

  // getOrders() {
  //   if (this.state.orders) {
  //     return this.state.orders;
  //   }
  //   return this.props.orders;
  // }

  getStatuscolor(status) {
    let statusColor;
    if (status === 'Pending') {
      statusColor = "orange"
    }
    else if (status === 'Completed') {
      statusColor = "green"
    }
    else if (status === 'Cancelled') {
      statusColor = "red"
    }
    return statusColor;
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  onCloseDrawer() {
    this.setState({
      visible: false,
    });
  }

  render() {
    console.log(this.state.orders);
    const { activeIndex } = this.state;
    // const { menu } = this.state;
    const { orders } = this.props;
    // const orders = this.getOrders();
    const pageContent = (
      <div className="admin-orders-list">
        <div
          onClick={this.showDrawer}
          onKeyPress="onKeyPress"
          role="button"
          tabIndex="0"
        >
          <i className="fas fa-filter">Filter</i>
        </div>
        <Accordion styled>
          <Accordion.Title>
            <div className="admin-order-title" style={{ marginLeft: '1.4em' }} >Meal</div>
            <div className="admin-order-tprice">Total Price(&#x20A6;)</div>
            <div className="admin-order-status">Status</div>
          </Accordion.Title>
          {orders.map((order, index) => (
            // <div style={{ borderTop: `2px solid ${this.getStatuscolor(order.status)}` }} >
            <div>
              <Accordion.Title
                active={activeIndex === index}
                index={index}
                order={order}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                <div className="admin-order-title">{order.Meal.title}</div>
                <div className="admin-order-tprice">&#x20A6;{order.totalPrice}</div>
                <div className="admin-order-status">
                  <i className="fas fa-circle" style={{ color: `${this.getStatuscolor(order.status)}` }} />{order.status}
                </div>
                
              </Accordion.Title>
              <Accordion.Content active={activeIndex === index}>
                <div className="admin-order-base">Base Price: <span>{order.Meal.price}</span></div>
                <div className="foodextras">
                  {order.extras.map(extra =>
                    <p>{extra.title} x{extra.OrderExtra.quantity}</p>)
                  }
                </div>
                <div> {order.address} </div>
                {this.renderCompleteButton(order.status)}
                {/* <Button content="Complete" color="green" onClick={this.updateOrderStatus} /> */}
                {/* <Checkbox toggle defaultChecked /> */}
              </Accordion.Content>
            </div>
        ))}
        </Accordion>
        <Drawer
          title="Filter"
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
          <FilterOrders />
        </Drawer>
      </div>
    );
    
    return (
      <AdminLayout content={pageContent} />
    );
  }
}

AdminOrdersPage.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  // menu: PropTypes.shape({
  //   success: PropTypes.bool.isRequired,
  //   message: PropTypes.string.isRequired,
  //   meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // })
  //   .isRequired,
  loadOrders: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ loadOrders, updateOrder }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  orders: state.orderReducer,
});

// const DayOrdersPageWithCSS = CSSModules(DayOrdersPage, styles, { allowMultiple: true });
export default connect(mapStateToProps, mapDispatchToProps)(AdminOrdersPage);
