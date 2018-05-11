import Controller from './Controller';
import orders from '../models/Order';
import db from '../model/index';

class OrderController extends Controller {
  static createOrder(req, res) {
    const {
      mealId,
      extraIds,
      address,
      createdById,
      cateredById,
    } = req.body;

    const mealIdInt = parseInt(mealId, 10);
    // if mealId is empty or not an integer output error message
    if (!mealId || !Number.isInteger(mealIdInt)) {
      return res.status(400).json({
        success: false,
        message: 'Input a valid mealId',
      });
    }
    
    // db.Meal.findOne({
    //   where: { id: mealId },
    //   include: [{
    //     model: db.Extra,
    //     through: {
    //       foreignKey: 'extraId',
    //       attributes: ['id'],
    //     },
    //     as: 'extras',
    //   }],
    // })
    // .then(orderedMeal => {
    //   extraIds.forEach(element => {
    //     // if( mealExtras.includes(element)){
    //       // mealExtras.find(ext => ext===element )
    //     // }
    //     return res.status(404).json({
    //       success: false,
    //       message: 'Extra is not served with this particular meal',
    //     });
    //   })
    // })
    let price = 0;
    db.Meal
      .findOne({ where: { id: mealId } })
      .then((exists) => {
        if (exists) {
          db.MealExtra
            .findAll({ where: { mealId } })
            .then((mealExtras) => {
              const mealExtrasIds = mealExtras.map(obj => obj.extraId);
              extraIds.forEach((element) => {
                if (mealExtrasIds.includes(element)) {
                  // mealExtras.find(ext => ext === element)
                  //   .then((extr) => {
                  db.Extra
                    .findOne({ where: { id: element } })
                    .then((extra) => {
                      console.log(extra.price);
                      price += (extra.price);
                      console.log(`price is ${extra}`);
                    });
                    // });
                } else {
                  return res.status(404).json({
                    success: false,
                    message: 'Extra is not served with this particular meal',
                  });
                }
              });
            })
            .then(() => {
              db.Order.create({
                mealId,
                totalPrice: price,
                address,
                createdById,
                cateredById,
              })
                .then((ord) => {
                  req.body.extraIds.map(id =>
                    db.OrderExtra.create({ extraId: id, orderId: ord.id }))
                    .then(res.status(201).send(ord));
                });
            });
        } else {
          res.status(404).json({
            success: false,
            message: 'Meal not found',
          });
        }
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
    db.Order
      .findOne({ where: { id: parseInt(req.params.id, 10) } })
      .then((orderOpt) => {
        if (orderOpt) {
          orderOpt.update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            extras: req.body.extras,
          })
            .then(() => {
              res.status(200).json({
                success: true,
                message: 'meal updated',
                order: orderOpt,
              });
            });
        } else {
          return res.status(404).json({
            success: false,
            message: `Cannot find meal with id ${id}`,
          });
        }
      });
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
        // const endTimer = Date.now();
        const endTimer = new Date();
        const timeElapsed = endTimer.getTime() - orders[i].startTimer;
        if (timeElapsed < 50000) { // if less than 10secons has passed
          const newOrders = orders.splice(i, 1);
          return res.status(200)
            .json({
              success: true,
              message: 'Order deleted',
              newOrders,
            });
        }
        return res.status(400)
          .json({
            success: false,
            message: 'You cannot delete an order after 50 seconds',
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
