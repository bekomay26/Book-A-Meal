import moment from 'moment';
import Controller from './Controller';
import db from '../model/index';
import removeDuplicates from '../helpers/removeDuplicates';

class MenuController extends Controller {
  /**
   * Creates a new Menu
   * @memberof MenuController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  // creates menu for current day, adds Id and date automatically and posts it to the menus list
  static async createDaysMenu(req, res) {
    try {
      const {
        mealIds,
        // createdBy, // required field just not inputted by the user but the app
      } = await req.body;

      const todaysDate = moment(new Date()).format('YYYY-MM-DD');
      const foundMenu = await db.Menu.findOne({ where: { date: todaysDate } });
      if (foundMenu) {
        return res.status(409)
          .json({
            success: false,
            message: 'Menu for today already exists',
          });
      }
      const uniqueMealIds = removeDuplicates(mealIds);
      let meal;
      for (let i = 0; i < uniqueMealIds.length; i += 1) {
        /* eslint-disable no-await-in-loop */
        meal = await db.Meal.findOne({ where: { id: uniqueMealIds[i] } });
        if (!meal) {
          return res.status(404).json({
            success: false,
            message: `Meal with id ${uniqueMealIds[i]} not found`,
          });
        }
      }
      // Validate createdBy is an admin Id
      const newMenu = await db.Menu.create({ date: todaysDate });
      newMenu.addMeals(uniqueMealIds);
      return res.status(201).json({
        success: true,
        message: 'Menu created for today',
        newMenu,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }

  static async createMenu(req, res) {
    try {
      const {
        date,
        mealIds,
        // createdBy, // required field just not inputted by the user but the app
      } = await req.body;
      if (!(moment(date, 'DD-MM-YYYY').isValid())) {
        return res.status(400).json({
          success: false,
          message: 'Input a valid date',
        });
      }
      // const dateObj = (moment(date, 'MM-DD-YYYY')).toDate();
      const dateObj = (moment(date, 'DD-MM-YYYY')).format('YYYY-MM-DD');
      console.log(`fdhjhjdfhdfh djfhjhvdh ${dateObj}`);
      console.log(`DatrdatrefdfdggdnDSSFDGGDG ${moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')}`);
      const foundMenu = await db.Menu.findOne({ where: { date: dateObj } });
      // console.log(`fdhjhjdfhdfh djfhjhvdh ${foundMenu.date}`);
      console.log(`sjgt,njnsjgjs ${foundMenu}`);
      if (foundMenu) {
        return res.status(409)
          .json({
            success: false,
            message: `Menu for the date ${req.body.date} already exists`,
          });
      }
      const uniqueMealIds = removeDuplicates(mealIds);
      let meal;
      for (let i = 0; i < uniqueMealIds.length; i += 1) {
        /* eslint-disable no-await-in-loop */
        meal = await db.Meal.findOne({ where: { id: uniqueMealIds[i] } });
        if (!meal) {
          return res.status(404).json({
            success: false,
            message: `Meal with id ${uniqueMealIds[i]} not found`,
          });
        }
      }
      // Validate createdBy is an admin Id
      const newMenu = await db.Menu.create({ date: dateObj });
      newMenu.addMeals(uniqueMealIds);
      // console.log(`fddgdg ${newMenu}`);
      // const menuWithMeals = newMenu.getMeals();
      // console.log(`fddgdg ${menuWithMeals}`);
      return res.status(201).json({
        success: true,
        message: 'Menu created',
        newMenu,
        // menuWithMeals,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }
  /** should be retrieved by date from the menus table when
   * working with the database and returns a lit of meals */
  /**
   * Retrieves current day's Menu
   * @memberof MenuController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async retrieveDayMenu(req, res) {
    try {
      // const todaysDateStr = (new Date()).toLocaleDateString('en-GB');
      // const todaysDate = (moment(todaysDateStr, 'DD-MM-YYYY')).format('YYYY-MM-DD');
      const todaysDate = moment(new Date()).format('YYYY-MM-DD');
      const menu = await db.Menu.findOne({ where: { date: todaysDate } });
      if (!menu) {
        return res.status(404)
          .json({
            success: false,
            message: 'There is no menu for today',
          });
      }
      const daysMenu = await db.Menu.findOne({
        where: { date: todaysDate },
        include: [{
          model: db.Meal,
          through: {
            foreignKey: 'mealId',
            attributes: ['title', 'description', 'price'],
          },
          as: 'meals',
        }],
      });
      return res.status(200).json({
        success: true,
        message: 'Menu Retrieved',
        daysMenu,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }
}

export default MenuController;
