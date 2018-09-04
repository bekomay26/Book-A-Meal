import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import '../../assets/styles/navbar.css';

class UserNavBar extends Component {
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
        <div className="topnav row user-top" id="myTopnav">
          <button className="icon" onClick={this.openSideNav}>
            <i className="fa fa-bars" />
          </button>
          <div className="col-6">
            <Link to="/" className="navlogo col-5">Book-A-Meal</Link>
          </div>
          <nav className="col-6 navgroup">
            <li className={`col-3 navlink ${signedinVisibility}`}>{userName}</li>
            <NavLink className="col-3 show navlink" to="/menu" activeClassName="active">Menu</NavLink>
            <NavLink className="col-3 show navlink" to="/orders" activeClassName="active">Order</NavLink>
            <NavLink className={`col-3 navlink ${navlinkVisibility}`} to="/login" activeClassName="active">Login</NavLink>
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
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

UserNavBar.defaultProps = {
  userName: undefined,
  isAuthenticated: false,
  isCaterer: false,
};

UserNavBar.propTypes = {
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

export default connect(mapStateToProps)(UserNavBar);
