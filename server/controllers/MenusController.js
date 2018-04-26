import Controller from './Controller';
import Menu from '../models/Menu';
import menus from '../tests/dummyData/fakeMenus';

class MenusController extends Controller {
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
    menus.forEach((menu) => {
      if (menu.date === req.body.date) {
        exists = true;
      }
    });
    if (!exists) {
      const lenOfId = menus.length;
      const id = menus[lenOfId - 1].id + 1;
      const menu = new Menu(id, date, meals, createdBy, editedBy);
      menus.push(menu);
      return res.status(201).json({
        success: true,
        message: 'menu created',
        menus,
      });
    }
    return res.status(409).json({
      success: false,
      message: `Menu for the date ${req.body.date} already exists`,
    });
  }
  static retrieveMenus(req, res) {
    res.status(200).json({
      success: true,
      message: 'Menus retrieved',
      menus,
    });
  }
  // input date if future date and not a past nor present date, edit away.
  static updateMenu(req, res) {
    // yyyy-mm-dd format
    const { dateString } = req.params;
    const dateInput = Date.parse(dateString); // or = new Date(todaysDateString) for date format
    // today's date
    const d = new Date();
    const todaysDateString = `${d.getFullYear().toString()}-${(d.getMonth() + 1).toString()}-${d.getDate().toString()}`;
    const todaysDate = Date.parse(todaysDateString);
    const dDate = dateString.replace(/-/g, '/'); // regex to replace all occurence
    if (dateInput <= todaysDate) { // compares in utc not local time bcos of how it was parsed
      return res.status(400)
        .json({
          success: false,
          message: 'You cannot edit previous or today\'s menu',
        });
    }
    const { meals } = req.body;

    let updatedMenu;
    for (let i = 0; i < menus.length; i += 1) {
      if (menus[i].date === dDate) {
        menus[i].meals = meals || menus[i].meals;
        updatedMenu = menus[i];
        return res.status(200)
          .json({
            success: true,
            message: 'Menu Updated',
            menu: updatedMenu,
          });
      }
    }
    return res.status(404).json({
      success: false,
      message: `Cannot find menu for date ${dDate}`,
    });
  }

  /** delete a meal, cannot select meals of previous days on the UI.
   * same should be done for the edit above */
  static destroy(req, res) {
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
}

export default MenusController;
