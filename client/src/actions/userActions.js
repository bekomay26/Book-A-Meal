import * as types from './actionTypes';

const createUser = user => (
  { type: types.CREATE_USER, user }
);

export { createUser };

// export function createUser(user) {
//   return {type: 'CREATE_USER', user}
// }
