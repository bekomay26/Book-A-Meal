import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


class Authentication {
  static verifyUser(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'] || req.headers.Authorization || null;
    if (!token) {
      res.status(401).send({
        success: false,
        message: 'Token not provided',
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
      res.status(401).send({ success: false, message: 'Admin Only' });
    }
  }

  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 59086400, // expires in 24 hours
    });
    return token;
  }
}

export default Authentication;
