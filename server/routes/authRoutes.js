import express from 'express';
import validateHelper from '../validations/ValidationHelper';
import authValidate from '../validations/authValidation';
import AuthController from '../controllers/AuthController';
import Authentication from '../middleware/Authentication';

const authRouter = express.Router();
authRouter.use(authValidate.create, validateHelper.validate);
authRouter.route('/signup')
  .post(AuthController.createUser);
authRouter.route('/login')
  .post(AuthController.loginUser);
authRouter.route('/signup/admin')
  .post(Authentication.checkSuperAdmin, authValidate.createSuper, AuthController.createSuperUser);

export default authRouter;
