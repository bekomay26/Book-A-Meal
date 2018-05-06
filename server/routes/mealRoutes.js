import express from 'express';
import MealController from '../controllers/MealController';
import Authentication from '../middleware/Authentication';

const mealRouter = express.Router();
mealRouter.use(Authentication.verifyUser, Authentication.checkAdmin);

mealRouter.route('/')
  .post(MealController.createMeal);
mealRouter.put('/:id', MealController.update);
mealRouter.delete('/:id', MealController.deleteMeal);
mealRouter.route('/')
  .get(MealController.retrieveAll);
export default mealRouter;
