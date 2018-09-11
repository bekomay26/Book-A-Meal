import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, Drawer } from 'antd';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/authActions';
import '../../assets/styles/navbar.css';

export class AdminNavBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleSideBar: false,
    };
    this.openSideNav = this.openSideNav.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
  }

  openSideNav() { this.setState({ visibleSideBar: true }); }

  handleSidebarHide() { this.setState({ visibleSideBar: false }); }
  render() {
    const { userName } = this.props;
    const { isAuthenticated } = this.props;
    const { visibleSideBar } = this.state;
    let navlinkVisibility = 'show';
    let signedinVisibility = 'hide';
    if (isAuthenticated) {
      navlinkVisibility = 'hide';
      signedinVisibility = 'show';
    }
    return (
      <div>
        <div className="admin-top topnav row" id="myTopnav">
          <button className="icon" onClick={this.openSideNav}>
            <i className="fa fa-bars" />
          </button>
          <div className="col-6">
            <NavLink className="navlogo col-5" to="/">BOOK-A-MEAL</NavLink>
          </div>
          <nav className="col-6 navgroup">
            <li className={`col-5 navlink admin-nav ${signedinVisibility}`}>{<span><Icon type="user" />{userName}</span>}</li>
            <NavLink className={`col-3 navlink out admin-nav ${signedinVisibility}`} activeClassName="active" to="/login" onClick={(e) => { e.preventDefault(); this.props.logout(); }}>logout</NavLink>
          </nav>
        </div>
        <Drawer
          className="admin-drawer"
          title="Book-A-Meal"
          width={400}
          placement="left"
          maskClosable={false}
          onClose={this.handleSidebarHide}
          visible={visibleSideBar}
        >
          <NavLink className="col-3 show navlink" to="/meals" activeClassName="active">Meals</NavLink>
          <NavLink className="col-3 show navlink" to="/setmenu" activeClassName="active">Menu</NavLink>
          <NavLink className="col-3 show navlink" to="/adorders" activeClassName="active">Orders</NavLink>
          <NavLink className={`col-3 navlink ${navlinkVisibility}`} to="/login" activeClassName="active">SignIn</NavLink>
          <NavLink className={`col-3 navlink out ${signedinVisibility}`} activeClassName="active" to="/login" onClick={(e) => { e.preventDefault(); this.props.logout(); }}>logout</NavLink>
        </Drawer>
      </div>
    );
  }
}

AdminNavBar.defaultProps = {
  userName: undefined,
  isAuthenticated: false,
};

AdminNavBar.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavBar);
