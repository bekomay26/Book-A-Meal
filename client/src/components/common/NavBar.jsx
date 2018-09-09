import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/authActions';

class NavBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    let navlinkVisibility = 'show';
    let signedinVisibility = 'hide';
    if (this.props.isAuthenticated) {
      navlinkVisibility = 'hide';
      signedinVisibility = 'show';
    }
    return (
      <div>
        <div className="back-image" />
        <div className="top row home-nav">
          <Link href="/" to="/" className="col-8 logo"><h2>Book-A-Meal</h2></Link>
          <nav className="menu col-4">
            <li className={`col-3 ${signedinVisibility}`}>{this.props.userName}</li>
            <li className="col-3"><NavLink to="/menu" activeClassName="active">Menu</NavLink></li>
            <li className="col-3"><NavLink to="/orders" activeClassName="active">Order</NavLink></li>
            <li className={`col-3 ${navlinkVisibility}`}><NavLink to="/login" activeClassName="active">Login</NavLink></li>
            <li className={`col-3 ${signedinVisibility}`}><NavLink to="/login" onClick={(e) => { e.preventDefault(); this.props.logout(); }}>Logout</NavLink></li>
          </nav>
        </div>
      </div>);
  }
}

NavBar.defaultProps = {
  userName: undefined,
  isAuthenticated: false,
};

NavBar.propTypes = {
  userName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};


/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isCaterer: state.authReducer.isCaterer,
  userName: state.authReducer.userName,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
