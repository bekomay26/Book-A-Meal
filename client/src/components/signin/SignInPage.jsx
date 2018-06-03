import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/authActions';
import '../../assets/styles/style.css';
import NavBar from '../common/NavBar';
import '../../assets/styles/login.css';

class SignInPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        username: '',
        password: '',
      },
    };
    this.onUnameChange = this.onUnameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUnameChange(event) {
    event.preventDefault();
    const { user } = this.state;
    const { name } = event.target;
    user[name] = event.target.value;
    this.setState({ user });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.user);
  }
  render() {
    if (this.props.userId) {
      return (<Redirect
        push
        to={{
          pathname: '/menu',
        }}
      />);
    }
    return (
      <div>
        <header id="bigpic" className="bigpic">
          <NavBar />
          <form className="form" onSubmit={this.onSubmit}>
            <div className="form-details">
              <input id="uname" type="text" placeholder="Enter Username" />
              <input id="pwd" type="password" placeholder="Enter Password" />
              <div className="userRole row">
                <div className="col-6">
                  <input id="role" type="radio" value="Customer" /> Customer
                </div>
                <div className="col-6">
                  <input id="role" type="radio" value="Caterer" /> Caterer
                </div>
              </div>
              <input type="submit" value="Sign In" />
            </div>
            <p>Don't have an account? <a href="signup.html">Sign up</a></p>
          </form>
        </header>
      </div>
    );
  }
}

SignInPage.defaultProps = {
  userId: undefined,
};

SignInPage.propTypes = {
  // users: PropTypes.arrayOf(PropTypes.object).isRequired,
  login: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  userId: state.authReducer.userId,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
