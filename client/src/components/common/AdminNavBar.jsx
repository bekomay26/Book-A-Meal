import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/styles/navbar.css';
import { Icon, Drawer } from 'antd';
import { Sidebar, Segment, Menu, Header, Image } from 'semantic-ui-react';

export class AdminNavBar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleSideBar: false,
    };
    // this.onSelect = this.onSelect.bind(this);
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
        <div className="admin-top topnav row" id="myTopnav">
          <button className="icon" onClick={this.openSideNav}>
            <i className="fa fa-bars" />
            {/* <Icon type="menu-unfold" /> */}
          </button>
          <div className="col-6">
            <a href="#home" className="navlogo col-5">BOOK-A-MEAL</a>
          </div>
          <nav className="col-6 navgroup">
            <NavLink className={`col-3 navlink out admin-nav ${signedinVisibility}`} activeClassName="active" to="/login" onClick={(e) => { e.preventDefault(); logout(); }}>logout</NavLink>
            <li className={`col-5 navlink admin-nav ${signedinVisibility}`}>{<span><Icon type="user" />{userName}</span>}</li>
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
          <NavLink className={`col-3 navlink ${navlinkVisibility}`} to="/auth" activeClassName="active">SignIn</NavLink>
          {/* <NavLink className={`col-3 navlink ${navlinkVisibility}`} to="/signup" activeClassName="active">SignUp</NavLink> */}
          <NavLink className={`col-3 navlink out ${signedinVisibility}`} activeClassName="active" to="/login" onClick={(e) => { e.preventDefault(); logout(); }}>logout</NavLink>
        </Drawer>
      </div>
    );
  }
}

AdminNavBar.defaultProps = {
  userName: undefined,
  isAuthenticated: false,
  isCaterer: false,
};

AdminNavBar.propTypes = {
  userName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isCaterer: PropTypes.bool,
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

export default connect(mapStateToProps)(AdminNavBar);
