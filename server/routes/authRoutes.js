import express from 'express';
import validateHelper from '../validations/ValidationHelper';
import authValidate from '../validations/authValidation';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();
authRouter.use(authValidate.create, validateHelper.validate);
authRouter.route('/signup')
  .post(AuthController.createUser);
authRouter.route('/login')
  .post(AuthController.loginUser);

export default authRouter;
