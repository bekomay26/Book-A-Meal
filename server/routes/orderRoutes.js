import express from 'express';
import OrderController from '../controllers/OrderController';
import orderValidate from '../validations/orderValidation';
import Authentication from '../middleware/Authentication';
import validateHelper from '../validations/ValidationHelper';

const orderRouter = express.Router();
orderRouter.use(Authentication.verifyUser);

orderRouter.route('/')
  .post(orderValidate.create, validateHelper.validate, OrderController.createOrder);
orderRouter.route('/:id')
  .put(orderValidate.update, validateHelper.validate, OrderController.updateOrder);
orderRouter.route('/') // this is view all orders. yet to implement retrieveuserorders
  .get(Authentication.checkAdmin, OrderController.retrieveOrders);
orderRouter.route('/:id')
  .delete(orderValidate.delete, validateHelper.validate, OrderController.deleteOrder);

export default orderRouter;
