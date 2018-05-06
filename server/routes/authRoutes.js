import express from 'express';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.route('/signup')
  .post(AuthController.createUser);
authRouter.route('/login')
  .post(AuthController.loginUser);

export default authRouter;
