import Controller from './Controller';
import Meal from '../models/Meal';
import meals from '../tests/dummyData/fakeMeal';

/**
 * Class representing a Meal Controller.
 * @extends Point
 */
class MealController extends Controller {
  /**
   * Creates a new Meal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static createMeal(req, res) {
    const {
      title,
      description,
      image,
      price,
      extras,
    } = req.body;

    const lenOfId = meals.length;
    const id = meals[lenOfId - 1].id + 1;
    const meal = new Meal(id, title, description, image, price, extras, 1); // initialize qty to 1

    // if meal array is not empty set the id to the last element + 1 else, set it to zero
    meals.push(meal);
    return res.status(201).json({
      success: true,
      message: 'Meal created',
    });
  }
  /**
   * Modifies an existing meal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static update(req, res) {
    const id = parseInt(req.params.id, 10);
    let updatedMeal;
    meals.forEach((meal) => {
      if (meal.id === id) {
        meal.title = req.body.title || meal.title;
        meal.description = req.body.description || meal.description;
        meal.price = req.body.price || meal.price;
        meal.image = req.body.image || meal.image;
        meal.extras = req.body.extras || meal.extras;
        updatedMeal = meal;
      }
    });
    if (updatedMeal) {
      return res.status(200).json({
        success: true,
        message: 'meal updated',
        meal: updatedMeal,
      });
    }
    return res.status(404).json({
      success: false,
      message: `Cannot find meal with id ${id}`,
    });
  }
  /**
   * Deletes an existing meal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static deleteMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    for (let i = 0; i < meals.length; i += 1) {
      if (parseInt(meals[i].id, 10) === id) {
        meals.splice(i, 1);
        return res.status(200)
          .json({
            success: true,
            message: 'Meal deleted',
            meals,
          });
      }
    }
    return res.status(404).json({
      success: false,
      message: `Cannot find meal with id ${id}`,
    });
  }
  /**
   * Retrieves all Meals
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static retrieveAll(req, res) {
    res.status(200).json({
      success: true,
      message: 'Meals retrieved',
      meals,
    });
  }
}

export default MealController;
