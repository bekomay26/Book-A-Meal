import uniqid from 'uniqid';
import Controller from './Controller';
import Menu from '../models/Menu';
import menus from '../tests/dummyData/fakeMenus';
import mealss from '../tests/dummyData/fakeMeal';

class MenusController extends Controller {
  /**
   * Creates a new Menu
   * @memberof MenuController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static addMenu(req, res) {
    const {
      date,
      meals,
      createdBy, // required field just not inputted by the user but the app
      editedBy,
    } = req.body;

    // if date is not inputted or meals array is empty
    if (!date || !meals || meals.length <= 1) {
      return res.status(400).json({
        success: false,
        message: 'Input required missing field',
      });
    }
    let exists = false; // variable to hold the state of existence of a menu for a given day
    // changeTo find by
    menus.forEach((menu) => {
      if (menu.date === req.body.date) {
        exists = true;
      }
    });
    if (!exists) {
      const id = uniqid();
      const menu = new Menu(id, date, [], createdBy, editedBy);
      for (let i = 0; i < meals.length; i += 1) {
        function findById(item) {
          if (item.id === meals[i]) {
            return true;
          }
          return false;
        }
        const todayMenu = mealss.find(findById);
        menu.meals.push(todayMenu);
      }
      menus.push(menu);
      return res.status(201).json({
        success: true,
        message: 'menu created',
      });
    }
    return res.status(409).json({
      success: false,
      message: `Menu for the date ${req.body.date} already exists`,
    });
  }

  /**
   * Deletes an existing menu
   * @memberof MenuController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static deleteMenu(req, res) {
    /** delete a meal, cannot select meals of previous days on the UI.
   * same should be done for the edit above */
    const id = parseInt(req.params.id, 10);
    for (let i = 0; i < menus.length; i += 1) {
      if (parseInt(menus[i].id, 10) === id) {
        menus.splice(i, 1);
        return res.status(200)
          .json({
            success: true,
            message: 'Menu deleted',
            menus,
          });
      }
    }
    return res.status(404).json({
      success: false,
      message: `Cannot find menu with id ${id}`,
    });
  }

  /**
   * Retrieves current day's Menu
   * @memberof MenuController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static retrieveTodaysMenu(req, res) {
    // added the en-GB cos it was giving yyyy-mm-dd by default
    const todaysDate = new Date().toLocaleDateString();
    function findByDate(item) {
      if (item.date === todaysDate) {
        return true;
      }
      return false;
    }
    const todayMenu = menus.find(findByDate);
    if (todayMenu) {
      return res.status(200).json({
        success: true,
        message: 'Menu retrieved',
        menu: todayMenu.meals,
      });
    }
    return res.status(404).json({
      success: false,
      message: 'There is no menu for today',
    });
  }
}

export default MenusController;
