import jwt from 'jsonwebtoken';
import app from '../app';


class Authentication {
  static verifyUser(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'] || req.headers.authorization || null;
    if (!token) {
      res.status(401).send({
        success: false,
        message: 'Token not provided',
      });
    } else {
      jwt.verify(token, app.get('superSecret'), (err, decoded) => {
        if (err) {
          res.status(403).send({ success: false, message: 'invalid token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  }
  static checkAdmin(req, res, next) {
    if (req.decoded.role === 'Caterer') {
      next();
    } else {
      res.status(401).send({ success: false, message: 'unauthorized' });
    }
  }

  static generateToken(payload) {
    const token = jwt.sign(payload, app.get('superSecret'), {
      expiresIn: 86400, // expires in 24 hours
    });
    return token;
  }
}

export default Authentication;
