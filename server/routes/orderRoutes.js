import express from 'express';
import OrderController from '../controllers/OrderController';

const orderRouter = express.Router();

orderRouter.route('/')
  .post(OrderController.createOrder);
orderRouter.route('/:id')
  .put(OrderController.updateOrder);
orderRouter.route('/')
  .get(OrderController.retrieveOrders);
orderRouter.route('/:id')
  .delete(OrderController.deleteOrder);

export default orderRouter;
