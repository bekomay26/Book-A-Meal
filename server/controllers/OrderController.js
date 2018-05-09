import moment from 'moment';
import Controller from './Controller';
import db from '../model/index';

class OrderController extends Controller {
  static async createOrder(req, res) {
    const {
      mealId,
      extraIds,
      qtys, // zero not allowed, default is 1
      address,
      createdById,
      cateredById,
    } = await req.body;

    const mealIdInt = await parseInt(mealId, 10);
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
    const exists = await db.Meal.findOne({ where: { id: mealId } });
    if (exists) {
      price += exists.price;
      const mealExtras = await db.MealExtra.findAll({ where: { mealId } });
      const mealExtrasIds = await mealExtras.map(obj => obj.extraId);
      for (let i = 0; i < extraIds.length; i += 1) {
        if (mealExtrasIds.includes(extraIds[i])) {
          const extra = await db.Extra.findOne({ where: { id: extraIds[i] } });
          price += (extra.price * (qtys[i] || 1));
        } else {
          return res.status(404).json({
            success: false,
            message: 'Extra is not served with this particular meal',
          });
        }
      }
      const ord =
        await db.Order.create({
          mealId,
          totalPrice: price,
          address,
          createdById,
          cateredById,
          status: 'Pending',
        });
      await req.body.extraIds.map(id =>
        db.OrderExtra.create({ extraId: id, orderId: ord.id }));
      (res.status(201).send(ord));
    } else {
      res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
    }
  }
  static async updateOrder(req, res) {
    const id = parseInt(req.params.id, 10);
    const {
      extraIds,
      qtys,
      address,
    } = req.body;
    let price = 0;
    const orderOpt = await db.Order
      .findOne({ where: { id: parseInt(req.params.id, 10) } });
    if (orderOpt) {
      console.log(`folafdgdggd ${orderOpt}`);
      console.log(`foladsff ${orderOpt.mealId}`);
      const meal = await db.Meal.findOne({ where: { id: orderOpt.mealId } });
      price += meal.price;
      const mealExtras = await db.MealExtra.findAll({ where: { mealId: orderOpt.mealId } });
      const mealExtrasIds = await mealExtras.map(obj => obj.extraId);
      for (let i = 0; i < extraIds.length; i += 1) {
        if (mealExtrasIds.includes(extraIds[i])) {
          const extra = await db.Extra.findOne({ where: { id: extraIds[i] } });
          price += (extra.price * (qtys[i] || 1));
        } else {
          return res.status(404).json({
            success: false,
            message: 'Extra is not served with this particular meal',
          });
        }
      }
      orderOpt.update({
        address,
        totalPrice: price,
      });
      res.status(200).json({
        success: true,
        message: 'meal updated',
        order: orderOpt,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `Cannot find meal with id ${id}`,
      });
    }
  }
  // this is retrieve all for admin. dere should be retrieve by user and by date for customer and user respectively.
  // there can also be retrieve by date for customer
  // Admin can have retrieve by status
  // there can also be retrieve by caterer. If going the route of multi admins
  static async retrieveOrders(req, res) {
    const orders = await db.Order
      .findAll({
        include: [{
          model: db.Meal,
          attributes: ['title', 'description', 'price'],
        },
        {
          model: db.Extra,
          through: {
            foreignKey: 'extraId',
            attributes: ['title', 'price'],
          },
          as: 'extras',
        },
        ],
      });
    res.status(200).send({ orders });
  }

  static async deleteOrder(req, res) {
    const currentTime = moment.tz(new Date(), 'America/Danmarkshavn');
    console.log(currentTime);
    const id = parseInt(req.params.id, 10);
    const orderOpt = await db.Order
      .findOne({ where: { id: parseInt(req.params.id, 10) } });
    const creaTime = moment.tz(orderOpt.createdAt, 'America/Danmarkshavn');
    // const e = moment(creaTime).fromNow();
    const timeElapsed = (moment.duration(currentTime.diff(creaTime))).asMinutes();
    if (orderOpt) {
      if (timeElapsed < 15) {
        await orderOpt.destroy();
        res.status(200).json({
          success: true,
          message: 'Meal deleted',
        });
      } else {
        return res.status(400)
          .json({
            success: false,
            message: 'You cannot delete an order after 15 Minutes',
          });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: `Cannot find meal with id ${id}`,
      });
    }
  }
}

export default OrderController;
