import moment from 'moment';
import Controller from './Controller';
// import Menu from '../models/Menu';
// import menus from '../tests/dummyData/fakeMenus';
// import menu from '../tests/dummyData/fakeMenu';
import db from '../model/index';

class MenuController extends Controller {
  // creates menu for current day, adds Id and date automatically and posts it to the menus list
  static createMenu(req, res) {
    const {
      date,
      mealIds,
      createdBy, // required field just not inputted by the user but the app
      editedBy,
    } = req.body;

    // if date is not inputted or meals array is empty
    if (!date || !mealIds || mealIds.length <= 1) {
      return res.status(400).json({
        success: false,
        message: 'Input required missing field',
      });
    } else if (!(moment(date, 'MM-DD-YYYY').isValid())) {
      return res.status(400).json({
        success: false,
        message: 'Input a valid date',
      });
    }
    const dateObj = (moment(date, 'MM-DD-YYYY')).toDate();
    db.Menu
      .findOne({ where: { date: dateObj } })
      .then((menuExists) => {
        if (menuExists) {
          return res.status(409)
            .json({
              success: false,
              message: `Menu for the date ${date} already exists`,
            });
        }
        return res.status(201)
          .send({ message: 'Menu Created', status: 200 });
      });
    db.Menu.create({
      // mealId: req.body.mIds,
      date: dateObj,
    })
      .then((men) => {
        // const userId = req.decoded.data.id;
        req.body.mealIds.map(id =>
          db.MenuMeal
            .create({ mealId: id, menuId: men.id }))
          .then(res.status(201).send(men))
          .catch(error => res.status(400).send(error));
      });
  }
  /** should be retrieved by date from the menus table when
   * working with the database and returns a lit of meals */
  static retrieveDayMenu(req, res) {
    const todaysDateStr = (new Date()).toLocaleDateString('en-GB');
    const todaysDate = (moment(todaysDateStr, 'MM-DD-YYYY')).toDate();
    db.Menu
      .findOne({ where: { date: todaysDate } })
      .then((menuExists) => {
        if (!menuExists) {
          return res.status(404)
            .json({
              success: false,
              message: 'There is no menu for today',
            });
        }
        // return res.status(200)
        //   .json({
        //     success: true,
        //     message: 'Menu retrieved',
        //   });
        return db.Menu.findOne({
          where: { date: todaysDate },
          include: [{
            model: db.Meal,
            through: {
              foeignKey: 'mealId',
              attributes: ['title', 'description', 'price'],
            },
            as: 'meals',
          }],
        })
          .then(todaysMenu => res.status(200).send({ todaysMenu }));
      });
  }
}

export default MenuController;
