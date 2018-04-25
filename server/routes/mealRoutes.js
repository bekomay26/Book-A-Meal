import express from 'express';
import MealController from '../controllers/MealController';

const mealRouter = express.Router();

mealRouter.route('/')
  .post(MealController.createMeal);
// mealRouter.post('/', () => {
//   MealController.createMeal;
// })

// .get('/:mealId', MealController)
// .put()
// .delete();

export default mealRouter;