import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input} from 'semantic-ui-react';


const SignIn = ({ onValChange, passValue, unameValue, onSubmit }) => {
  return (
    <div>
      <Form className="authForm" onSubmit={onSubmit} >
        <Form.Field className="auth-field" control={Input} id="uname2" name="uname" label="Username" placeholder="John Doe" onChange={onValChange} value={unameValue} />
        <Form.Field className="auth-field" control={Input} type="password" id="pwd2" name="pwd" label="Password" placeholder="P@33w0rd" onChange={onValChange} value={passValue} />
        <Form.Button className="authButton">Login</Form.Button>
      </Form>
    </div>
  );
};

SignIn.propTypes = {
  // mealextras: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   price: PropTypes.number.isRequired,
  // })
  //   .isRequired,
  // addBtnClicked: PropTypes.bool.isRequired,
};

export default SignIn;
