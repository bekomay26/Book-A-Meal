import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Upload, Icon, message } from 'antd';
import { Form, FormField, FormInput, Image, Input, Label, Grid, Select } from 'semantic-ui-react';


const SignUp = ({ onValChange, passValue, unameValue, onSave }) => {
  return (
    <div>
      <Form className="authForm" onSubmit={onSave} >
        <Form.Field className="auth-field" control={Input} id="unameS" name="username" label="Username" placeholder="John Doe" onChange={onValChange} value={unameValue} />
        <Form.Field className="auth-field" control={Input} id="addrS" name="address" label="Address" placeholder="Where should we deliver your meal..." />
        <Form.Field className="auth-field" control={Input} type="password" id="pwdS" name="password" label="Password" placeholder="P@33w0rd" onChange={onValChange} value={passValue} />
        <Form.Field className="textAuth">
          <text>
          By creating an account,<br />you agree with our Terms and Conditions.
          </text>
        </Form.Field>
        <Form.Button className="authButton">Create Account</Form.Button>
      </Form>
    </div>
  );
};

SignUp.propTypes = {
  // mealextras: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  // })
  //   .isRequired,
  // addBtnClicked: PropTypes.bool.isRequired,
};

export default SignUp;
