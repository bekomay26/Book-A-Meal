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
    const { // add username l8r
      username,
      password,
      address,
      role, // validate all this in validator file
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
    const { // add username l8r
      username,
      password,
    } = await req.body;

    const foundUser = await db.User.findOne({ where: { username } });
    const match = await bcrypt.compare(password, foundUser.password);
    if (!foundUser || !match) {
      res.status(401).json({
        success: false,
        message: 'Invalid Credentials',
      });
    } else {
      const payload = {
        id: foundUser.id,
        role: foundUser.role,
      };
      const token = Authentication.generateToken(payload);
      res.json({
        success: true,
        message: `Welcome, ${username}`,
        token,
      });
    }
  }
}

export default AuthController;
