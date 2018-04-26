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
    // const notification = new Order();
    for (let i = 0; i < menu.length; i += 1) {
      if (parseInt(menu[i].id, 10) === mealIdInt) {
        newOrder.meal = menu[i];
        // notification.meal = menu[i]; // Create a new notification when a meal is ordered
        // notification.status = 'pendingAdmin';
        orders.push(newOrder); // After adding the other properties
        // notifications.push(notification);
        return res.status(201)
          .json({
            success: true,
            message: 'Meal added to order',
            newOrder,
          });
      }
    }
    return res.status(404).json({
      success: false,
      message: 'Meal not found',
    });
  }
}

export default OrderController;
