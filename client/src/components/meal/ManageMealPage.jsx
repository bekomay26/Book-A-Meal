import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadMeals } from '../../actions/mealActions';
import UserNavBar from '../common/UserNavBar';
import '../../assets/styles/mm.css';
import MealList from './MealList';

class ManageMeal extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    // const { menu } = this.state;
    const { meals } = this.props;
    return (
      <div>
        <UserNavBar />
        <h2>Today's Orders</h2>
        <div class="order">
        
          <div class="day-summ row">
            <div class="col-4">
              <h3>11/12/2018</h3>
            </div>
            <div class="col-4">
              <p class="total-prc">&#x20A6;65,000:00</p>
            </div>
            <div class="col-4 stat">
              <p><span><i class="fas fa-circle pend"></i></span> Pending 3</p>
              <p><span><i class="fas fa-circle canc"></i></span> Cancelled 9</p>
              <p><span><i class="fas fa-circle comp"></i></span> Completed 98</p>
            </div>
          </div>
          <OrderList orders={orders} />
        </div>
      </div>
    );
  }
};

DayOrdersPage.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
  // menu: PropTypes.shape({
  //   success: PropTypes.bool.isRequired,
  //   message: PropTypes.string.isRequired,
  //   meals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  // })
  //   .isRequired,
  loadMeals: PropTypes.func.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ loadMeals }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  meals: state.mealReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageMealPage);
