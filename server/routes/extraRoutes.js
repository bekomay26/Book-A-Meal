import express from 'express';
import ExtraController from '../controllers/ExtraController';
// import extraValidate from '../validations/extraValidation';
// import Authentication from '../middleware/Authentication';
// import validateHelper from '../validations/ValidationHelper';

const extraRouter = express.Router();
// extraRouter.use(Authentication.verifyUser, Authentication.checkAdmin);

// extraRouter.route('/')
//   .post(extraValidate.create, validateHelper.validate, MealController.createMeal);
// extraRouter.delete('/:id', extraValidate.delete, validateHelper.validate, ExtraController.deleteMeal);
extraRouter.route('/')
  .get(ExtraController.retrieveAll);
export default extraRouter;
