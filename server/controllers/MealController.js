import Controller from './Controller';
// import meals from '../tests/dummyData/fakeData';
import db from '../model/index';
import removeDuplicates from '../helpers/removeDuplicates';

/**
 * Class representing a Meal Controller.
 * @extends Controller
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
  static async createMeal(req, res) {
    const {
      title,
      description,
      image,
      price,
      extraIds,
    } = await req.body;

    // if title or price field are empty output error message
    if (!title || !price || !extraIds) {
      return res.status(400).json({
        success: false,
        message: 'Input missing field',
      });
    }

    // Removes duplicate Ids from inputted extraIds array
    const uniqueExtraIds = removeDuplicates(extraIds);

    let extra;

    // for each extra in the array, if the extra does not exist, return an error
    for (let i = 0; i < uniqueExtraIds.length; i += 1) {
      /* eslint-disable no-await-in-loop */
      extra = await db.Extra.findOne({ where: { id: uniqueExtraIds[i] } });
      if (!extra) {
        return res.status(404).json({
          success: false,
          message: `Extra with id ${uniqueExtraIds[i]} not found`,
        });
      }
    }

    // Create the meal
    const meal = await db.Meal.create({
      title,
      description,
      image_url: image,
      price,
    });

    // for each unique extra id, create a row along with the mealId in the join table
    // await meal.setExtras(uniqueExtraIds, { through: db.MealExtras });
    await meal.addExtras(uniqueExtraIds);

    return res.status(201).json({
      success: true,
      message: 'Meal created',
      meal,
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
  static async updateMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const meal = await db.Meal.findOne({ where: { id: parseInt(req.params.id, 10) } });
    const { extraIds } = req.body;
    const uniqueExtraIds = removeDuplicates(extraIds);
    if (meal) {
      meal.update({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image_url: req.body.image,
      });
      const mealextras = await db.MealExtra.findAll({ where: { mealId: id } });
      for (let i = 0; i < mealextras.length; i += 1) {
        await mealextras[i].destroy();
      }
      await meal.setExtras(uniqueExtraIds, { through: db.MealExtras });
    } else {
      return res.status(404).json({
        success: false,
        message: `Cannot find meal with id ${id}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'meal updated',
      meal,
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
  static async deleteMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const meal = await db.Meal.findOne({ where: { id: parseInt(req.params.id, 10) } });
    if (meal) {
      await meal.destroy();
    } else {
      return res.status(404).json({
        success: false,
        message: `Cannot find meal with id ${id}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Meal deleted',
      meal,
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
  static async retrieveAll(req, res) {
    const meals = await db.Meal.findAll({});
    res.status(200).json({
      success: true,
      message: 'Meals retrieved',
      meals,
    });
  }
}

export default MealController;
