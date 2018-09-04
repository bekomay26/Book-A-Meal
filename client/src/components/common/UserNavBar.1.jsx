import React from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from '../../assets/styles/style.css';

const UserNavBar = ({logout}) => (
  <div>
    <div styleName="back-image" />
    <div styleName="top row">
      <a href="index.html" styleName="col-8 logo"><h2>Book-A-Meal</h2></a>
      <nav styleName="menu col-4">
        <li styleName="col-3"><NavLink to="/menu" activeClassName="active">Menu</NavLink></li>
        <li styleName="col-3"><NavLink to="/cart" activeClassName="active">Order</NavLink></li>
        <li styleName="col-3"><NavLink to="/login" activeClassName="active">SignIn</NavLink></li>
        {/* <li className="col-3"><NavLink to="/signup" activeClassName="active">Signup</NavLink></li> */}
        <li styleName="col-3"><NavLink to="/login" onClick={ (e) => {e.preventDefault(); logout(); }}>outtt</NavLink></li>
      </nav>
    </div>
  </div>
);

const UserNavBarWithCSS = CSSModules(UserNavBar, styles, { allowMultiple: true });
export default (UserNavBarWithCSS);
// export default UserNavBar;



// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import CSSModules from 'react-css-modules';
// import styles from '../../assets/styles/navbar.css';

// const UserNavBar = ({logout}) => (
//   <div>
//     <div className="topnav row" id="myTopnav">
//       <a href="javascript:void(0);" className="icon" onclick="openNav()">
//         <i className="fa fa-bars"></i>
//       </a>
//       <div className="col-6">
//         <a href="#home" className="navlogo col-5">BOOK-A-MEAL</a>
//       </div>
//       <nav className="col-6">
//         <NavLink className="col-25 navlink" to="/menu" activeClassName="active">Menu</NavLink>
//         <NavLink className="col-25 navlink" to="/cart" activeClassName="active">Order</NavLink>
//         <NavLink className="col-25 navlink" to="/login" activeClassName="active">SignIn</NavLink>
//       </nav>
//     </div>
//   </div>

// );
// export default (UserNavBar);
