import moment from 'moment';
import { Op } from 'sequelize';
import Controller from './Controller';
import db from '../model/index';
import removeDuplicates from '../helpers/removeDuplicates';

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
          if (mealExtrasIds.includes(uniqueExtraIds[i])) {
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
        uniqueExtraIds.forEach((extId, index) => newOrder.addExtra(extId, { through: { quantity: qtys[index] }}));
        // newOrder.addExtras(uniqueExtraIds, { through: { quantity: 3 }});
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
      console.log(req.body);
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
        let price = 0;
        const meal = await db.Meal.findOne({ where: { id: foundOrder.mealId } });
        price += meal.price;

        if (extraIds) {
          const uniqueExtraIds = removeDuplicates(extraIds);
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
          const orderExtras = await db.OrderExtra.findAll({ where: { orderId: id } });
          for (let i = 0; i < orderExtras.length; i += 1) {
            await orderExtras[i].destroy();
          }
          // await foundOrder.setExtras(uniqueExtraIds, { through: db.MealExtras });
          uniqueExtraIds.forEach((extId, index) => foundOrder.addExtra(extId, { through: { quantity: qtys[index] } }));
        } else {
          price = foundOrder.totalPrice;
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

  /**
   * Modifies an existing Order's status
   * @memberof OrderController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async updateOrderStatus(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        status,
      } = await req.body;
      console.log(status);
      const foundOrder = await db.Order.findOne({ where: { id: parseInt(req.params.id, 10) } });
      if (status !== 'Cancelled' && status !== 'Completed') {
        return res.status(422).json({
          success: false,
          message: 'Invalid status',
        });
      }
      if (foundOrder) {
        foundOrder.update({
          status,
        });
        return res.status(200).json({
          success: true,
          message: 'Order Status Updated',
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
    const userRole = req.decoded.role;
    if (userRole === 'Caterer') {
      const orders = await db.Order
        .findAll({
          include: [{
            model: db.Meal,
            attributes: ['title', 'description', 'price', 'image_url'],
          },
          {
            model: db.Extra,
            through: {
              foreignKey: 'extraId',
            },
            attributes: ['title', 'price'],
            as: 'extras',
          },
          ],
        });
      res.status(200).json({
        success: true,
        message: 'Orders retrieved',
        orders,
      });
    }
    if (userRole === 'Customer') {
      const orders = await db.Order
        .findAll({
          where: {
            createdById: req.decoded.id,
          },
          include: [{
            model: db.Meal,
            attributes: ['title', 'description', 'price', 'image_url'],
          },
          {
            model: db.Extra,
            through: {
              foreignKey: 'extraId',
            },
            attributes: ['title', 'price'],
            as: 'extras',
          },
          ],
          order: [['createdAt', 'DESC']],
        });
      res.status(200).json({
        success: true,
        message: 'My Orders retrieved',
        orders,
      });
    }
  }

  /**
   * Filter Orders
   * @memberof OrderController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async filterOrders(req, res) {
    const {
      fromDate,
      toDate,
      statuses,
      totalPrice,
      priceOperation,
    } = req.query;
    if (fromDate.length > 0 && !(moment(fromDate, ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid())) {
      return res.status(422).json({
        success: false,
        message: 'Input a valid date',
      });
    }
    if (toDate.length > 0 && !(moment(toDate, ['DD-MM-YYYY', 'YYYY-MM-DD']).isValid())) {
      return res.status(422).json({
        success: false,
        message: 'Input a valid date',
      });
    }
    const symbol = priceOperation || 'great';
    const tPrice = totalPrice || 0;
    let startDate = fromDate ? (moment(fromDate, 'DD-MM-YYYY')).format('YYYY-MM-DD') : null;
    let endDate = toDate ? (moment(toDate, 'DD-MM-YYYY')).format('YYYY-MM-DD') : null;
    if (startDate === null) {
      startDate = moment('30-01-2018', 'DD-MM-YYYY').format('YYYY-MM-DD');
    }
    if (endDate === null) {
      endDate = moment(new Date()).format('YYYY-MM-DD');
    }
    let operand;
    if (symbol === 'great') {
      operand = 'gt';
    } else if (symbol === 'less') {
      operand = 'lt';
    } else if (symbol === 'equal') {
      operand = 'eq';
    } else if (symbol === 'between') {
      operand = 'between';
    }
    // queryObj[[Op.and]] = [Op.and];
    const orders = await db.Order
      .findAll({
        where: {
          [Op.and]: [
            (
              statuses ? [{
                status: {
                  [Op.or]: statuses,
                },
              },
              ] : null
            ),
            (
              startDate ? [{
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              }] : null
            ),
            (
              [{
                totalPrice: {
                  [Op[operand]]: tPrice,
                },
              }]
            ),
          ],
        },
      });
    res.status(200).json({
      success: true,
      message: 'Orders retrieved',
      orders,
    });
  }

  /**
   * Retrieves my Orders
   * @memberof OrderController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  // static async retrieveMyOrders(req, res) {
  //   const userId = req.decoded.id;
  //   const orders = await db.Order
  //     .findAll({
  //       where: {
  //         userId,
  //       },
  //       include: [{
  //         model: db.Meal,
  //         attributes: ['title', 'description', 'price'],
  //       },
  //       {
  //         model: db.Extra,
  //         through: {
  //           foreignKey: 'extraId',
  //         },
  //         attributes: ['title', 'price'],
  //         as: 'extras',
  //       },
  //       ],
  //       order: [['createdAt', 'DESC']],
  //     });
  //   res.status(200).json({
  //     success: true,
  //     message: 'My Orders retrieved',
  //     orders,
  //   });
  // }

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
