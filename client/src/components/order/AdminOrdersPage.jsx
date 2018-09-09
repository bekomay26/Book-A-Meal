import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Accordion, Icon, Button } from 'semantic-ui-react';
import { Drawer, Pagination } from 'antd';
import { loadOrders, updateOrder, filterOrders } from '../../actions/orderActions';
import '../../assets/styles/adminorders.css';
import AdminLayout from '../common/AdminLayout';
import FilterOrders from './FilterOrders';

export class AdminOrdersPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeIndex: 0,
      order: {},
      visible: false,
      filterObj: {},
      filtered: false,
      currentPage: 1,
      queryString: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateOrderStatus = this.updateOrderStatus.bind(this);
    this.getStatuscolor = this.getStatuscolor.bind(this);
    this.renderCompleteButton = this.renderCompleteButton.bind(this);
    this.showDrawer = this.showDrawer.bind(this);
    this.onCloseDrawer = this.onCloseDrawer.bind(this);
    this.updateFilterInputState = this.updateFilterInputState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.loadOrders();
  }

  onSubmit() {
    const mealName = document.getElementById('meal-name').value; // trim value
    const range = document.getElementsByClassName('ant-slider-handle-1')[0].getAttribute('aria-valuenow');
    const range2 = document.getElementsByClassName('ant-slider-handle-2')[0].getAttribute('aria-valuenow');
    const start = document.getElementById('start-date').getElementsByClassName('ant-calendar-picker-input')[0].value;
    const end = document.getElementById('end-date').getElementsByClassName('ant-calendar-picker-input')[0].value;
    const canc = document.getElementById('Checkbox-Cancelled').checked;
    const pend = document.getElementById('Checkbox-Pending').checked;
    const compl = document.getElementById('Checkbox-Completed').checked;
    let queryString = '';
    queryString += `fromDate=${start}&toDate=${end}&totalPrice=${range}&totalPrice=${range2}&mealTitle=${mealName}`;
    if (canc) {
      queryString += '&statuses=Cancelled';
    }
    if (pend) {
      queryString += '&statuses=Pending';
    }
    if (compl) {
      queryString += '&statuses=Completed';
    }
    this.props.filterOrders(queryString);
    this.setState({ filtered: true, queryString });
  }

  onCloseDrawer() {
    this.setState({
      visible: false,
    });
  }

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


  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { order } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex, order });
  }

  updateOrderStatus() {
    const { order } = this.state;
    order.status = 'Completed';
    this.setState({ order });
    this.props.updateOrder(this.state.order);
  }

  // Not sure if method is still necessary
  updateFilterInputState(event) {
    const field = event.target.name;
    const filterObj = Object.assign({}, this.state.filterObj);
    filterObj[field] = event.target.value;
  }

  handlePageChange(pageNum) {
    const limit = 10;
    const offset = (pageNum - 1) * limit;
    if (this.state.filtered) {
      this.props.filterOrders(this.state.queryString, limit, offset);
    } else {
      this.props.loadOrders(limit, offset);
    }
    this.setState({
      currentPage: pageNum,
    });
  }

  showDrawer() {
    this.setState({
      visible: true,
    });
  }

  renderCompleteButton(order) {
    const completeButton = (<div className="admin-order-compl-btn"><Button content="Complete Order" color="green" onClick={this.updateOrderStatus} /></div>);
    if (order.status === 'Pending') {
      return completeButton;
    }
    return (<div className="admin-order-date-compl">Date Completed: {order.updatedAt}</div>);
  }

  render() {
    const { activeIndex } = this.state;
    const { orders } = this.props;
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
          <Accordion.Title className="admin-order-accord-head" >
            <div className="admin-order-title" style={{ marginLeft: '1.4em' }} >Meal</div>
            <div className="admin-order-tprice">Total Price(&#x20A6;)</div>
            <div className="admin-order-status">Status</div>
          </Accordion.Title>
          {orders.map((order, index) => (
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
                <div className="admin-order-exp-info">
                  <div className="admin-order-base">Base Price: <span>{order.Meal.price}</span></div>
                  <div className="admin-order-extras">
                    Extras: {order.extras.map(extra =>
                      <p>{extra.title} <span>x{extra.OrderExtra.quantity}</span></p>)
                    }
                  </div>
                  <div className="admin-order-date-ord">Date ordered: {order.createdAt} </div>
                  {this.renderCompleteButton(order)}
                </div>
              </Accordion.Content>
            </div>
        ))}
        </Accordion>
        <Pagination
          className="paginate-btn"
          current={this.state.currentPage}
          onChange={this.handlePageChange}
          total={this.props.pagination.totalCount}
        />;
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
          <FilterOrders
            updateFilterInputState={this.updateFilterInputState}
            onSubmit={this.onSubmit}
          />
        </Drawer>
      </div>
    );
    return (
      <AdminLayout content={pageContent} page="Orders" />
    );
  }
}

AdminOrdersPage.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  pagination: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    pageNum: PropTypes.number.isRequired,
  }).isRequired,
  loadOrders: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  filterOrders: PropTypes.func.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  loadOrders, updateOrder, filterOrders,
}, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  orders: state.orderReducer.orders,
  pagination: state.orderReducer.pagination,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrdersPage);
