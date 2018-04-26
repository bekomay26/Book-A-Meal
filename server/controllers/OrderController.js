import Controller from './Controller';
import Order from '../models/Order';
// import orders from '../tests/dummyData/fakeOrder';
import menu from '../tests/dummyData/fakeMenu';

class OrderController extends Controller {
  static createOrder(req, res) {
    const { mealIdStr } = req.body;

    const mealId = parseInt(mealIdStr, 10);
    // if mealId is empty or not an integer output error message
    if (!mealId || !Number.isInteger(mealId)) {
      return res.status(400).json({
        success: false,
        message: 'Input a valid mealId',
      });
    }
    const newOrder = new Order();
    for (let i = 0; i < menu.length; i += 1) {
      if (parseInt(menu[i].id, 10) === mealId) {
        newOrder.meal = menu[i];
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
