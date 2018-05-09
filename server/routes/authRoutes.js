import express from 'express';
import validateHelper from '../validations/ValidationHelper';
import authValidate from '../validations/authValidation';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();
// authRouter.use(validateHelper.validate);
authRouter.route('/signup')
  .post(authValidate.create, validateHelper.validate, AuthController.createUser);
authRouter.route('/login')
  .post(AuthController.loginUser);

export default authRouter;
