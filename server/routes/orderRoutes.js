import express from 'express';
import OrderController from '../controllers/OrderController';
import Authentication from '../middleware/Authentication';

const orderRouter = express.Router();
orderRouter.use(Authentication.verifyUser);

orderRouter.route('/')
  .post(OrderController.createOrder);
orderRouter.route('/:id')
  .put(OrderController.updateOrder);
orderRouter.route('/') // this is view all orders. yet to implement retrieveuserorders
  .get(Authentication.checkAdmin, OrderController.retrieveOrders);
orderRouter.route('/:id')
  .delete(OrderController.deleteOrder);

export default orderRouter;
