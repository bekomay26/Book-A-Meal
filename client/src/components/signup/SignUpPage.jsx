import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../actions/authActions';
// import '../../assets/styles/style.css';
import NavBar from '../common/NavBar';
import '../../assets/styles/login.css';


class SignUpPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        username: '',
        password: '',
      },
    };
    this.onUnameChange = this.onUnameChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onUnameChange(event) {
    event.preventDefault();
    const { user } = this.state;
    const { name } = event.target;
    user[name] = event.target.value;
    this.setState({ user });
  }
  onSave(event) {
    event.preventDefault();
    this.props.signUp(this.state.user);
  }

  // userRow(user, index) {
  //   return <div key={index}> {user.username}</div>
  // }
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
          <form className="form" onSubmit={this.onSave}>
            <div className="form-details">
              <input id="uname" name="username" type="text" placeholder="Enter Username" onChange={this.onUnameChange} value={this.state.user.username} />
              <input id="pwd" name="password" type="password" placeholder="Enter Password" onChange={this.onUnameChange} value={this.state.user.password} />
              <input id="pwd2" type="password" placeholder="Confirm Password" />
              <input type="submit" value="Sign Up" />
            </div>
            <p>I already have an account? <a href="login.html">Sign in</a></p>
          </form>
        </header>
      </div>
    );
  }
}

SignUpPage.defaultProps = {
  userId: undefined,
};

SignUpPage.propTypes = {
  // users: PropTypes.arrayOf(PropTypes.object).isRequired,
  signUp: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

/**
 * @desc maps dispatch to props;
 * @param {*} dispatch dispatch
 * @returns {*} action to be dispatched
 */
const mapDispatchToProps = dispatch => bindActionCreators({ signUp }, dispatch);

/**
 * @desc maps state to props;
 * @param {*} state store state
 * @returns {*} store state
 */
const mapStateToProps = state => ({
  userId: state.authReducer.userId,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
