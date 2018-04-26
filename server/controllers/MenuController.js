import Controller from './Controller';
import Menu from '../models/Menu';
import menus from '../tests/dummyData/fakeMenus';
import menu from '../tests/dummyData/fakeMenu';

class MenuController extends Controller {
  // creates menu for current day, adds Id and date automatically and posts it to the menus list
  static createMenu(req, res) {
    const { meals } = req.body;

    // if meal is not an array the array is empty
    if (!Array.isArray(meals) || meals.length <= 1) {
      let message;
      if (!Array.isArray(meals)) {
        message = 'Input must be a list of meals i.e an array';
      } else {
        message = 'Menu list must contain 2 or more meals';
      }
      return res.status(400).json({
        success: false,
        message,
      });
    }
    let exists = false; // variable to hold the state of existence of a menu for a given day
    const d = new Date();
    const todaysDate = `${d.getDate().toString()}/${(d.getMonth() + 1).toString()}/${d.getFullYear().toString()}`;
    // console.log(todaysDate);
    menus.forEach((men) => {
      if (men.date === todaysDate) { // compares the dates in the menu list to current date
        exists = true;
      }
    });
    if (!exists) {
      const lenOfId = menus.length;
      const id = menus[lenOfId - 1].id + 1;
      const menuAdd = new Menu(id, todaysDate, meals);
      menus.push(menuAdd); // adds to Menus Table
      return res.status(201).json({
        success: true,
        message: 'menu created',
        meals,
      });
    }
    return res.status(409).json({ // for test, dont hardcode date
      success: false,
      message: `Menu for today, the ${todaysDate} already exists`,
    });
  }
  // should be retrieved by date when working with the database
  static retrieveDayMenu(req, res) {
    res.status(200).json({
      success: true,
      message: 'Meals retrieved',
      menu,
    });
  }
}

export default MenuController;
