import bcrypt from 'bcrypt';
import Controller from './Controller';
import db from '../model/index';
import Authentication from '../middleware/Authentication';

/**
 * Class representing an Authentication Controller.
 * @extends Controller
 */
class AuthController extends Controller {
  /**
   * Creates a new User
   * @method createUser
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async createUser(req, res) {
    try {
      const { // add username l8r
        username,
        password,
        address, // validate all this in validator file
      } = await req.body;

      
      // const hashPassword;
      const user = await db.User
        .findOne({ where: { username } });
      if (user) {
        return res.status(409)
          .json({
            success: false,
            message: `${username} already exists`,
          });
      }
      const hashPassword = await bcrypt.hash(password, 10);

      const role = 'Customer';
      const newUser = await db.User.create({
        username,
        password: hashPassword,
        address,
        role,
      });
      const payload = {
        id: newUser.id,
        role: newUser.role,
      };
      const token = Authentication.generateToken(payload);
      return res.status(201).json({
        success: true,
        message: 'User Created',
        newUser,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }

  /**
   * Logs in a user
   * @method loginUser
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async loginUser(req, res) {
    try {
      const { // add username l8r
        username,
        password,
      } = await req.body;

      const foundUser = await db.User.findOne({ where: { username } });
      const match = await bcrypt.compare(password, foundUser.password);
      if (!foundUser || !match) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password',
        });
      }
      const payload = {
        id: foundUser.id,
        role: foundUser.role,
      };
      const token = Authentication.generateToken(payload);
      return res.status(200).json({
        success: true,
        message: `Welcome, ${username}`,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }

  static async createSuperUser(req, res) {
    try {
      const { // add username l8r
        username,
        password,
        address, // validate all this in validator file
        roleId,
      } = await req.body;

      let { role } = req.body;
      // const hashPassword;
      const user = await db.User
        .findOne({ where: { username } });
      if (user) {
        return res.status(409)
          .json({
            success: false,
            message: `${username} already exists`,
          });
      }
      const hashPassword = await bcrypt.hash(password, 10);

      if (roleId === 0) {
        role = 'Customer';
      } else if (roleId === 1) {
        role = 'Caterer';
      }
      const newUser = await db.User.create({
        username,
        password: hashPassword,
        address,
        role,
      });
      const payload = {
        id: newUser.id,
        role: newUser.role,
      };
      const token = Authentication.generateToken(payload);
      return res.status(200).json({
        success: true,
        message: 'User Created',
        newUser,
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }
}

export default AuthController;
