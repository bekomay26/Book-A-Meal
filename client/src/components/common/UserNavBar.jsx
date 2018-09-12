import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import PropTypes from 'prop-types';
import '../../assets/styles/navbar.css';

export class UserNavBar extends Component {
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
    const { logout } = this.props;
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
        <div className="topnav row user-top" id="myTopnav">
          <button className="icon" onClick={this.openSideNav}>
            <i className="fa fa-bars" />
          </button>
          <div className="col-6">
            <a href="#home" className="navlogo col-5">BOOK-A-MEAL</a>
          </div>
          <nav className="col-6 navgroup">
            <li className={`col-3 navlink ${signedinVisibility}`}>{userName}</li>
            <NavLink className="col-3 show navlink" to="/menu" activeClassName="active">Menu</NavLink>
            <NavLink id="nav-orders" className="col-3 show navlink" to="/orders" activeClassName="active">Order</NavLink>
            <NavLink className={`col-3 navlink ${navlinkVisibility}`} to="/login" activeClassName="active">SignIn</NavLink>
            <NavLink className={`col-3 navlink out ${signedinVisibility}`} activeClassName="active" to="/login" onClick={(e) => { e.preventDefault(); logout(); }}>logout</NavLink>
          </nav>
        </div>
        <Drawer
          title="Basic Drawer"
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
          {/* <NavLink className={`col-3 navlink out ${signedinVisibility}`} activeClassName="active" to="/login" onClick={(e) => { e.preventDefault(); this.props.logout(); }}>logout</NavLink> */}
        </Drawer>
      </div>
    );
  }
}

UserNavBar.defaultProps = {
  userName: undefined,
  isAuthenticated: false,
  // isCaterer: false,
};

UserNavBar.propTypes = {
  userName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  // isCaterer: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};


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

export default connect(mapStateToProps)(UserNavBar);
