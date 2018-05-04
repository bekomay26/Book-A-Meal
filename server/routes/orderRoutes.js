import express from 'express';
import OrderController from '../controllers/OrderController';
import orderValidate from '../validation/orderValidation';
import validateHelper from '../validation/validationHelper';

const orderRouter = express.Router();

orderRouter.route('/')
  .post(orderValidate.create, validateHelper.validate, OrderController.createOrder);
orderRouter.route('/:id')
  .put(orderValidate.update, validateHelper.validate, OrderController.updateOrder);
orderRouter.route('/')
  .get(OrderController.retrieveOrders);
orderRouter.route('/:id')
  .delete(orderValidate.delete, validateHelper.validate, OrderController.deleteOrder);

export default orderRouter;
