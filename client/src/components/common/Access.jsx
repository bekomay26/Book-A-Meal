import 'babel-polyfill';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/authActions';

export class Access extends Component {
  constructor(props) {
    super(props);

    this.logoutNow = this.logoutNow.bind(this);
    this.tokenExpired = this.tokenExpired.bind(this);
  }

  /**
   * method to handle logout.
   * @param {object} event
   */
  logoutNow(event) {
    event.preventDefault();
    this.props.logout();
  }

  /**
   * method to verify if user token has expired
   */
  tokenExpired() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      const { exp } = jwt.decode(token);
      if (moment(Math.floor(Date.now() * 0.001)).isAfter(exp)) {
        return false;
      }
      return true;
    }
    return false;
  }

  render() {
    /**
     * Check if user token is still valid
     */
    if (!this.tokenExpired()) {
      const event = {
        preventDefault: () => Promise.resolve(),
      };
      this.logoutNow(event);
      return (
        <Redirect to="/login" />
      );
    }

    /**
     * Redirects unauthenticated users
     */
    if (!this.props.allowAnonymous) {
      if (!this.props.isAuthenticated) {
        return (
          <Redirect to="/login" />
        );
      }
    }

    /**
     * Restricts customer from accessing page if customer is not allowed
     */
    if (!this.props.allowCustomer) {
      if (!this.props.isCaterer && this.props.isAuthenticated) {
        return (
          <Redirect to="/unauthorized" />
        );
      }
    }

    /**
     * Handles output rendered by the component.
     * @returns {jsx} form of the component.
     */
    return (
      <div isAuthenticated={this.props.isAuthenticated} isCaterer={this.props.isCaterer} />
    );
  }
}

// proptypes
/* eslint-disable react/forbid-prop-types */
Access.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isCaterer: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  allowAnonymous: PropTypes.bool,
  allowCustomer: PropTypes.bool,
};

// default props
Access.defaultProps = {
  allowAnonymous: false,
  allowCustomer: false,
};

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => (
  {
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated,
    isCaterer: state.authReducer.isCaterer,
  }
);

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Access);
