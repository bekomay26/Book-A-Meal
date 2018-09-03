// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';

// const NavBar = () => (
//   <div>
//     <div className="back-image" />
//     <div className="top row">
//       <Link to="/h" className="col-8 logo"><h2>Book-A-Meal</h2></Link>
//       <nav className="menu col-4">
//         <li className="col-3"><NavLink to="/menu" activeClassName="active">Menu</NavLink></li>
//         <li className="col-3"><NavLink to="/cart" activeClassName="active">Order</NavLink></li>
//         <li className="col-3"><NavLink to="/login" activeClassName="active">SignIn</NavLink></li>
//         <li className="col-3"><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
//       </nav>
//     </div>
//   </div>
// );
// export default NavBar;


import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/styles/navbar.css';
import { Icon, Drawer } from 'antd';
import { Sidebar, Segment, Menu, Header, Image } from 'semantic-ui-react';

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
            {/* <Icon type="menu-unfold" /> */}
          </button>
          <div className="col-6">
            <a href="#home" className="navlogo col-5">BOOK-A-MEAL</a>
          </div>
          <nav className="col-6 navgroup">
            <li className={`col-3 navlink ${signedinVisibility}`}>{userName}</li>
            <NavLink className="col-3 show navlink" to="/menu" activeClassName="active">Menu</NavLink>
            <NavLink className="col-3 show navlink" to="/myorders" activeClassName="active">Order</NavLink>
            <NavLink className={`col-3 navlink ${navlinkVisibility}`} to="/auth" activeClassName="active">SignIn</NavLink>
            {/* <NavLink className={`col-3 navlink ${navlinkVisibility}`} to="/signup" activeClassName="active">SignUp</NavLink> */}
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
