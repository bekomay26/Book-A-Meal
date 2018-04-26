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

  static retrieveDayOrders(req, res) {
    const { dateString } = req.params;
    const dDate = dateString.replace(/-/g, '/'); // regex to replace all occurence
    const dayOrders = [];
    if (Number.isNaN(Date.parse(dateString))) {
      return res.status(400)
        .json({
          success: false,
          message: 'Input valid date parameter in format yyyy-mm-dd',
        });
    }
    for (let i = 0; i < orders.length; i += 1) {
      if (orders[i].date === dDate) {
        dayOrders.push(orders[i]);
      }
    }
    if (dayOrders.length <= 0) {
      return res.status(404)
        .json({
          success: false,
          message: `No order for ${dDate} was found`,
        });
    }
    return res.status(200)
      .json({
        success: true,
        message: `Orders for ${dDate} retrieved`,
        dayOrders,
      });
  }
}

export default OrderController;
