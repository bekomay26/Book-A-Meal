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
}

export default MenusController;
