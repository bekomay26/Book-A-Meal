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

class NavBar extends Component {

  render() {
    let navlinkVisibility = 'show';
    let signedinVisibility = 'hide';
    if (this.props.isAuthenticated) {
      navlinkVisibility = 'hide';
      signedinVisibility = 'show';
    }
    return (<div>
    <div className="back-image" />
    <div className="top row">
      <Link to="/" className="col-8 logo"><h2>Book-A-Meal</h2></Link>
      <nav className="menu col-4">
        <li className={`col-3 ${signedinVisibility}`}>{this.props.userName}</li>
        <li className="col-3"><NavLink to="/menu" activeClassName="active">Menu</NavLink></li>
        <li className="col-3"><NavLink to="/myorders" activeClassName="active">Order</NavLink></li>
        <li className={`col-3 ${navlinkVisibility}`}><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        <li className={`col-3 ${signedinVisibility}`}><NavLink to="/login" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</NavLink></li>
      </nav>
    </div>
  </div>)
  }
};

NavBar.defaultProps = {
  userName: undefined,
  isAuthenticated: false,
};

NavBar.propTypes = {
  userName: PropTypes.string,
  isAuthenticated: PropTypes.bool,
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

export default connect(mapStateToProps)(NavBar);
