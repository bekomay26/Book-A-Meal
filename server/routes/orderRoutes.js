import express from 'express';
import OrderController from '../controllers/OrderController';

const orderRouter = express.Router();

orderRouter.route('/')
  .post(OrderController.createOrder);
orderRouter.route('/:id')
  .put(OrderController.updateOrder);
orderRouter.route('/')
  .get(OrderController.retrieveOrders);
orderRouter.route('/:dateString')
  .get(OrderController.retrieveDayOrders);
orderRouter.route('/:id')
  .delete(OrderController.destroy);

// mealRouter.post('/', () => {
//   MealController.createMeal;
// })

// .get('/:mealId', MealController)
// .put()
// .delete();

export default orderRouter;
