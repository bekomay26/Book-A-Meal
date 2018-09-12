import jwt from 'jsonwebtoken';
import Authentication from '../middleware/Authentication';

class Token {
  static adminToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJDYXRlcmVyIiwiaWF0IjoxNTI1ODcwNDc4LCJleHAiOjE1ODQ5NTY4Nzh9.naP5-2F-Xyl2ISo9P1AAubmhKFnDTjykraPlvTrdCjM';
  }
  static adminGenToken() {
    const payload = {
      id: 1,
      name: 'fola',
      role: 'Caterer',
    };
    return Authentication.generateToken(payload);
  }
  static userToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGUiOiJDdXN0b21lciIsImlhdCI6MTUyNTg2NzI1NCwiZXhwIjoxNTg0OTUzNjU0fQ.azU0jZmlU1fr4CEKGeckCqB4jJae5L9fINQnyFvu7HY';
  }
}

export default Token;
