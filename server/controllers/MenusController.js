import Controller from './Controller';
import Menu from '../models/Menu';
import menus from '../tests/dummyData/fakeMenu';

class MenuController extends Controller {
  static createMenu(req, res) {
    const {
      date,
      meals,
      createdBy, // required field just not inputted by the user but the app
      editedBy,
    } = req.body;

    // if date is not inputted or meals array is empty
    if (!date || meals.length <= 0) {
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
    return res.status(404).json({
      success: false,
      message: `Menu for the date ${req.body.date} already exists`,
    });
  }
}

export default MenuController;
