import Controller from './Controller';
import db from '../model/index';
import Authentication from '../middleware/Authentication';

class AuthController extends Controller {
  // creates menu for current day, adds Id and date automatically and posts it to the menus list
  static async createUser(req, res) {
    const { // add username l8r
      fullname,
      password,
      address,
      role, // validate all this in validator file
    } = await req.body;

    const userExists = await db.User
      .findOne({ where: { fullname } });
    if (userExists) {
      return res.status(409)
        .json({
          success: false,
          message: `User with the name ${fullname} already exists`,
        });
    }
    const newUser = await db.User.create({
      fullname,
      password,
      address,
      role,
    });
    res.status(200).json({
      success: true,
      message: 'User Created',
      newUser,
    });
  }

  static async loginUser(req, res) {
    const { // add username l8r
      fullname,
      password,
    } = await req.body;

    const userExists = await db.User.findOne({ where: { fullname } });
    if (!userExists) {
      res.status(404).json({
        success: false,
        message: 'User does not exist',
      });
    } else if (userExists.password !== password) {
      res.status(401).json({
        success: false,
        message: 'Authentication failed. Wrong password.',
      });
    } else {
      const payload = {
        id: userExists.id,
        role: userExists.role,
      };
      const token = Authentication.generateToken(payload);
      res.json({
        success: true,
        message: 'Here is your token!',
        token,
      });
    }
  }
}

export default AuthController;
