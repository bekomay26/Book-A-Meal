import Controller from './Controller';
import Order from '../models/Order';
import orders from '../tests/dummyData/fakeOrder';
import menu from '../tests/dummyData/fakeMenu';

class OrderController extends Controller {
  static createOrder(req, res) {
    const { mealId } = req.body;

    const mealIdInt = parseInt(mealId, 10);
    // if mealId is empty or not an integer output error message
    if (!mealId || !Number.isInteger(mealIdInt)) {
      return res.status(400).json({
        success: false,
        message: 'Input a valid mealId',
      });
    }
    const newOrder = new Order();
    for (let i = 0; i < menu.length; i += 1) {
      if (parseInt(menu[i].id, 10) === mealIdInt) {
        newOrder.meal = menu[i];
        newOrder.startTimer = Date.now();
        orders.push(newOrder); // After adding the other properties
        return res.status(201)
          .json({
            success: true,
            message: 'Meal added to order',
            orders,
          });
      }
    }
    return res.status(404).json({
      success: false,
      message: 'Meal not found',
    });
  }
  static updateOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      extras,
      qty,
    } = req.body;
    if (!Number.isInteger(parseInt(qty, 10))) {
      return res.status(400)
        .json({
          success: false,
          message: 'Input a valid quantity',
        });
    }
    let updatedOrder;
    for (let i = 0; i < orders.length; i += 1) {
      if (orders[i].id === id) {
        orders[i].meal.extras = extras || orders[i].meal.extras;
        orders[i].meal.qty = qty;
        updatedOrder = orders[i];
        return res.status(200)
          .json({
            success: true,
            message: 'Order Updated',
            Order: updatedOrder,
          });
      }
    }
    return res.status(404).json({
      success: false,
      message: `Cannot find order with id ${id}`,
    });
  }
  static retrieveOrders(req, res) {
    res.status(200).json({
      success: true,
      message: 'Orders retrieved',
      orders,
    });
  }

  static deleteOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    for (let i = 0; i < orders.length; i += 1) {
      if (parseInt(orders[i].id, 10) === id) {
        const endTimer = Date.now();
        const timeElapsed = endTimer - orders[i].startTimer;
        if (timeElapsed < 10000) { // if less than 10secons has passed
          orders.splice(i, 1);
          return res.status(200)
            .json({
              success: true,
              message: 'Order deleted',
              orders,
            });
        }
        return res.status(400)
          .json({
            success: false,
            message: 'You cannot delete an order after 10 seconds',
          });
      }
    }
    return res.status(404).json({
      success: false,
      message: `Cannot find order with id ${id}`,
    });
  }
}

export default OrderController;
