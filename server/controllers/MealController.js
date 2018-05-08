import Controller from './Controller';
// import meals from '../tests/dummyData/fakeData';
import db from '../model/index';

/**
 * Class representing a Meal Controller.
 * @extends Controller
 */
class MealController extends Controller {
  static async createMeal(req, res) {
    const {
      title,
      description,
      image,
      price,
      extraIds,
    } = await req.body;

    // if title or price field are empty output error message
    if (!title || !price) {
      return res.status(400).json({
        success: false,
        message: 'Input missing field',
      });
    }

    let exists;

    // for each extra in the array, if the extra does not exist, return an error
    for (let i = 0; i < extraIds.length; i += 1) {
      /* eslint-disable no-await-in-loop */
      exists = await db.Extra.findOne({ where: { id: extraIds[i] } });
      if (!exists) {
        return res.status(404).json({
          success: false,
          message: `Extra with id ${extraIds[i]} not found`,
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

    // for each extra id, create a row along with the mealId in the join table
    for (let i = 0; i < extraIds.length; i += 1) {
      /* eslint-disable no-await-in-loop */
      await db.MealExtra.create({ extraId: extraIds[i], mealId: meal.id });
    }
    return res.status(201).json({
      success: true,
      message: 'Meal created',
      meal,
    });
  }

  static async updateMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    const meal = await db.Meal.findOne({ where: { id: parseInt(req.params.id, 10) } });
    const { extraIds } = req.body;

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
      for (let i = 0; i < extraIds.length; i += 1) {
        await db.MealExtra.create({ extraId: extraIds[i], mealId: id });
      }
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
