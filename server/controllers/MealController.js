import Controller from './Controller';
import Meal from '../models/Meal';
// import meals from '../tests/dummyData/fakeData';
import db from '../model/index';

class MealController extends Controller {
  static createMeal(req, res) {
    const {
      title1,
      description1,
      image1,
      price1,
      extras1,
    } = req.body;

    // if title or price field are empty output error message
    if (!title1 || !price1) {
      return res.status(400).json({
        success: false,
        message: 'Input missing field',
      });
    }

    // const lenOfId = meals.length;
    // const id = meals[lenOfId - 1].id + 1;
    // const meal = new Meal(id, title, description, image, price, extras, 1); // initialize qty to 1

    // // if meal array is not empty set the id to the last element + 1 else, set it to zero
    // meals.push(meal);
    db.Meal.create({
      title: title1,
      description: description1,
      image: image1,
      price: price1,
      extras: extras1,
    })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
    // return res.status(201).json({
    //   success: true,
    //   message: 'Meal created',
    //   meals,
    // });
  }
  static update(req, res) {
    let updatedMeal;
    const id = parseInt(req.params.id, 10);
    db.Meal
      .findOne({ where: { id: parseInt(req.params.id, 10) } })
      .then((mealOpt) => {
        if (mealOpt) {
          mealOpt.update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            extras: req.body.extras,
          })
            .then(() => {
              res.status(200).json({
                success: true,
                message: 'meal updated',
                meal: mealOpt,
              });
            });
        } else {
          return res.status(404).json({
            success: false,
            message: `Cannot find meal with id ${id}`,
          });
        }
      });
  }
  static deleteMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    db.Meal
      .findOne({ where: { id: parseInt(req.params.id, 10) } })
      .then((mealOpt) => {
        if (mealOpt) {
          mealOpt.destroy()
            .then(() => {
              res.status(200).json({
                success: true,
                message: 'Meal deleted',
                // meal: updatedMeal,
              });
            });
        } else {
          return res.status(404).json({
            success: false,
            message: `Cannot find meal with id ${id}`,
          });
        }
      });
  }
  static retrieveAll(req, res) {
    db.Meal
      .findAll({})
      .then((meals) => {
        res.status(200).json({
          success: true,
          message: 'Meals retrieved',
          meals,
        });
      });
  }
}

export default MealController;
