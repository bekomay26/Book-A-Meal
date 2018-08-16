import moment from 'moment';
import Controller from './Controller';
import db from '../model/index';
import removeDuplicates from '../helpers/removeDuplicates';
import pagination from '../helpers/pagination';

class OrderController extends Controller {
  /**
 * Creates a new Order
 * @memberof OrderController
 * @param {object} req
 * @param {object} res
 * @returns {(json)}JSON object
 * @static
 */
  static async createOrder(req, res) {
    try {
      const {
        mealId,
        extraIds,
        qtys, // zero not allowed, default is 1
        address,
        createdById,
        cateredById,
      } = await req.body;

      // const mealIdInt = await parseInt(mealId, 10);
      const uniqueExtraIds = removeDuplicates(extraIds);
      let price = 0;
      const foundMeal = await db.Meal.findOne({ where: { id: mealId } });
      if (uniqueExtraIds.length !== 0) {
        uniqueExtraIds.every((unqExtId) => {
          const uExtId = parseInt(unqExtId, 10);
          if (!Number.isInteger(uExtId)) {
            return res.status(422).json({
              success: false,
              message: 'Extra IDs must be of type Integer',
            });
          }
        });
      }
      if (foundMeal) {
        // retrieve day's menu and id
        const todaysDate = moment(new Date()).format('YYYY-MM-DD');
        const foundMenu1 = await db.Menu.findOne({ where: { date: todaysDate } });
        const todayMenuId = foundMenu1.id;
        const foundMealInMenuJoinObj =
          await db.MenuMeal.findOne({ where: { menuId: todayMenuId, mealId } });

        if (!foundMealInMenuJoinObj) {
          return res.status(404).json({
            success: false,
            message: 'The Meal is not on the day\'s menu',
          });
        }
        price += foundMeal.price;
        const mealExtras = await db.MealExtra.findAll({ where: { mealId } });
        const mealExtrasIds = await mealExtras.map(obj => obj.extraId);
        for (let i = 0; i < uniqueExtraIds.length; i += 1) {
          console.log(mealExtrasIds.includes(uniqueExtraIds[i]) + 'eee');
          if (mealExtrasIds.includes(parseInt(uniqueExtraIds[i], 10))) {
            const extra = await db.Extra.findOne({ where: { id: uniqueExtraIds[i] } });
            if (qtys) {
              price += (extra.price * (qtys[i] || 1));
            } else {
              price += extra.price;
            }
          } else {
            return res.status(404).json({
              success: false,
              message: 'Extra is not served with this particular meal',
            });
          }
        }
        const newOrder =
          await db.Order.create({
            mealId,
            totalPrice: price,
            address,
            createdById,
            cateredById,
            status: 'Pending',
          });
        newOrder.addExtras(uniqueExtraIds);
        return res.status(201).json({
          success: true,
          message: 'Order created',
          newOrder,
        });
      }
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }

  /**
   * Modifies an existing Order
   * @memberof OrderController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async updateOrder(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        extraIds,
        qtys,
        address,
      } = await req.body;

      const currentTime = moment.tz(new Date(), 'America/Danmarkshavn');
      const foundOrder = await db.Order.findOne({ where: { id: parseInt(req.params.id, 10) } });
      if (foundOrder) {
        const creaTime = moment.tz(foundOrder.createdAt, 'America/Danmarkshavn');
        // const e = moment(creaTime).fromNow();
        const timeElapsed = (moment.duration(currentTime.diff(creaTime))).asMinutes();
        if (timeElapsed > 15) {
          return res.status(400)
            .json({
              success: false,
              message: 'You cannot update an order after 15 Minutes',
            });
        }
        const uniqueExtraIds = removeDuplicates(extraIds);
        let price = 0;
        const meal = await db.Meal.findOne({ where: { id: foundOrder.mealId } });
        price += meal.price;
        const mealExtras = await db.MealExtra.findAll({ where: { mealId: foundOrder.mealId } });
        const mealExtrasIds = await mealExtras.map(obj => obj.extraId);
        for (let i = 0; i < uniqueExtraIds.length; i += 1) {
          if (mealExtrasIds.includes(uniqueExtraIds[i])) {
            const extra = await db.Extra.findOne({ where: { id: uniqueExtraIds[i] } });
            price += (extra.price * (qtys[i] || 1));
          } else {
            return res.status(404).json({
              success: false,
              message: 'Extra is not served with this particular meal',
            });
          }
        }
        foundOrder.update({
          address,
          totalPrice: price,
        });
        return res.status(200).json({
          success: true,
          message: 'Order Updated',
          order: foundOrder,
        });
      }
      return res.status(404).json({
        success: false,
        message: `Cannot find order with id ${id}`,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }
  // this is retrieve all for admin. dere should be retrieve by
  // user and by date for customer and user respectively.
  // there can also be retrieve by date for customer
  // Admin can have retrieve by status
  // there can also be retrieve by caterer. If going the route of multi admins
  /**
   * Retrieves all Orders
   * @memberof OrderController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async retrieveOrders(req, res) {
    const limit = parseInt(req.query.limit, 10) || 30;
    const offset = req.query.offset || 0;
    const orders = await db.Order
      .findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [{
          model: db.Meal,
          attributes: ['title', 'description', 'price'],
        },
        {
          model: db.Extra,
          through: {
            foreignKey: 'extraId',
            attributes: [],
          },
          attributes: ['title', 'price'],
          as: 'extras',
        },
        ],
      });
    res.status(200).json({
      success: true,
      message: 'Orders retrieved',
      orders: orders.rows,
      pagination: pagination(limit, offset, orders.count),
    });
  }

  /**
   * Deletes an existing Order
   * @memberof OrderController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async deleteOrder(req, res) {
    const currentTime = moment.tz(new Date(), 'America/Danmarkshavn');
    const id = parseInt(req.params.id, 10);
    const orderOpt = await db.Order
      .findOne({ where: { id: parseInt(req.params.id, 10) } });

    if (orderOpt) {
      const creaTime = moment.tz(orderOpt.createdAt, 'America/Danmarkshavn');
      // const e = moment(creaTime).fromNow();
      const timeElapsed = (moment.duration(currentTime.diff(creaTime))).asMinutes();
      if (timeElapsed < 15) {
        await orderOpt.destroy();
        res.status(200).json({
          success: true,
          message: 'Order deleted',
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
        message: `Cannot find order with id ${id}`,
      });
    }
  }
}

export default OrderController;
