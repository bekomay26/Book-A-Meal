import jwt from 'jsonwebtoken';
/**
 * @desc verifies token
 * @param {string} token jwt token
 * @returns {object} object
 */
const checkAuth = (token) => {
  if (!token) {
    return {
      userRole: null,
      userId: null,
      userName: null,
    };
  }
  const decoded = jwt.decode(token);
  if (decoded) {
    if (decoded.exp < Date.now() / 1000) {
      return {
        userRole: null,
        userId: null,
        userName: null,
      };
    }
    return {
      userRole: decoded.role,
      userId: decoded.id,
      userName: decoded.name,
    };
  }
  return {
    userRole: null,
    userId: null,
    userName: null,
  };
};

export default checkAuth;
