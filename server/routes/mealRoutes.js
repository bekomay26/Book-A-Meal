import express from 'express';
import MealController from '../controllers/MealController';
import mealValidate from '../validations/mealValidation';
import Authentication from '../middleware/Authentication';
import validateHelper from '../validations/ValidationHelper';

const mealRouter = express.Router();
mealRouter.use(Authentication.verifyUser, Authentication.checkAdmin);

mealRouter.route('/')
  .post(mealValidate.create, validateHelper.validate, MealController.createMeal);
mealRouter.put('/:id', mealValidate.update, validateHelper.validate, MealController.updateMeal);
mealRouter.delete('/:id', mealValidate.delete, validateHelper.validate, MealController.deleteMeal);
mealRouter.route('/')
  .get(MealController.retrieveAll);
export default mealRouter;
