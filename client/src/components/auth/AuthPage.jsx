import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Tab } from 'semantic-ui-react';
import { login, signUp } from '../../actions/authActions';
import '../../assets/styles/login.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

export class AuthPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        uname: '',
        pwd: '',
        username: '',
        password: '',
        address: '',
      },
    };
    this.onUnameChange = this.onUnameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSave = this.onSave.bind(this);
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
    const userDetails = { username: this.state.user.uname, password: this.state.user.pwd };
    this.props.login(userDetails);
  }
  onSave(event) {
    event.preventDefault();
    this.props.signUp(this.state.user);
  }
  render() {
    if (this.props.isAuthenticated && this.props.isCaterer) {
      return (
        <Redirect push to="/meals" />
      );
    }
    if (this.props.isAuthenticated) {
      return (
        <Redirect to="/menu" />
      );
    }
    const panes = [
      {
        menuItem: 'SIGNIN',
        render: () => (
          <Tab.Pane loading={false} attached={false}>
            <SignIn
              onValChange={this.onUnameChange}
              unameValue={this.state.user.uname}
              passValue={this.state.user.pwd}
              onSubmit={this.onSubmit}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'SIGNUP',
        render: () => (
          <Tab.Pane loading={false} attached={false}>
            <SignUp
              onValChange={this.onUnameChange}
              unameValue={this.state.user.username}
              passValue={this.state.user.password}
              onSave={this.onSave}
            />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <div>
        <Tab className="authTab back-image" menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    );
  }
}

AuthPage.defaultProps = {
  isAuthenticated: false,
  isCaterer: false,
};

AuthPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isCaterer: PropTypes.bool,
  signUp: PropTypes.func.isRequired,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ login, signUp }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isCaterer: state.authReducer.isCaterer,
  userId: state.authReducer.userId,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
