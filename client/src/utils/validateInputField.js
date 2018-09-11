import { isEmpty, trim } from 'lodash';
import validator from 'validator';

/**
 * method to validate signup form
 * @param {object} state
 * @returns {object} {errors, isValid}
 */

const signupForm = (state) => {
  const errors = {};

  // check username
  if (!state.username.trim()) {
    errors.username = 'Username is required';
  } else if (/[^A-Za-z0-9_-]/gi.test(state.username.trim())) {
    errors.username = 'Only A-Z a-z 0-9 _ - characters are allowed';
  }

  // check password
  if (!state.password) {
    errors.password = 'Password is required';
  } else if (state.password.length < 6) {
    errors.password = 'Password must have at least 6 characters';
  } else if (state.password !== state.confirmPassword) {
    errors.password = 'Passwords do not match';
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

/**
 * method to validate login form
 * @param {object} state
 * @returns {object} {errors, isValid}
 */

const loginForm = (state) => {
  const errors = {};

  // check username
  if (!state.username.trim()) {
    errors.username = 'Username is required';
  } else if (/[^A-Za-z0-9_-]/gi.test(state.username.trim())) {
    errors.username = 'Only A-Z a-z 0-9 _ - characters are allowed';
  }

  // check password
  if (!state.password || !state.password.trim()) {
    errors.password = 'Password is required';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

/**
 * method to valid create meal input
 * @param {object} state
 * @returns {object} error object
 */
const validateMealInput = (state) => {
  const errors = {};
  if (!state.name || !state.name.trim()) {
    errors.name = 'Meal name is required';
  } else if (state.name.trim().length > 50) {
    errors.name = 'Meal name should not be more than 50 characters';
  } else if (/[^A-Za-z0-9 ]/gi.test(state.name.trim())) {
    errors.name = 'Meal name can only contain alphanumeric characters';
  }

  if (!state.price || !state.price.trim()) {
    errors.price = 'Price is required';
  } else if (/[^0-9.]/gi.test(state.price.trim())) {
    errors.price = 'Price is invalid';
  } else if (parseFloat(state.price.trim()) <= 1) {
    errors.price = 'Price must be greater than 1';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

const validateMenuInput = (state) => {
  const errors = {};
  if (isEmpty(state.mealIds)) {
    errors.mealIds = 'Meal options cannot be empty';
  } else if (/[^0-9]/gi.test(state.mealIds.join(''))) {
    errors.mealIds = 'One or more of the meal options are invalid';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export { loginForm, signupForm, validateMealInput, validateMenuInput };
