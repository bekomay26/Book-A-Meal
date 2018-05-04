import express from 'express';
import MealController from '../controllers/MealController';
import mealValidate from '../validation/mealValidation';
import validateHelper from '../validation/validationHelper';

const mealRouter = express.Router();

mealRouter.route('/')
  .post(mealValidate.create, validateHelper.validate, MealController.createMeal);
mealRouter.put('/:id', mealValidate.update, validateHelper.validate, MealController.update);
mealRouter.delete('/:id', mealValidate.delete, validateHelper.validate, MealController.deleteMeal);
mealRouter.route('/')
  .get(MealController.retrieveAll);

export default mealRouter;
