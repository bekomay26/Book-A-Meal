import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Controller from './Controller';
// import meals from '../tests/dummyData/fakeData';
import db from '../model/index';
import removeDuplicates from '../helpers/removeDuplicates';
import pagination from '../helpers/pagination';

dotenv.config();

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
    try {
      const {
        title,
        description,
        // image,
        price,
        extraIds,
      } = await req.body;
      const foundMeal = await db.Meal.findOne({ where: { title } });
      if (foundMeal) {
        return res.status(409).json({
          success: false,
          message: `meal ${title} exists`,
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
            message: `Extra with id ${uniqueExtraIds[i]} not found`, // does not exist
          });
        }
      }
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
      let image = '';
      if (req.file && req.file.path) {
        const uniqueImgId = `${title + price}`;
        const output = await cloudinary.v2.uploader.upload(req.file.path, { public_id: uniqueImgId });
        if (output) {
          image = output.secure_url;
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
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
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
    try {
      const id = parseInt(req.params.id, 10);
      const meal = await db.Meal.findOne({ where: { id: parseInt(req.params.id, 10) } });
      if (req.body.title) {
        const existingMeal = await db.Meal.findOne({ where: { title: req.body.title } });
        if (existingMeal) {
          return res.status(409).json({
            success: false,
            message: `Cannot update this meal because the title ${req.body.title} exists`,
          });
        }
      }
      console.log(req.body);
      if (meal) {
        meal.update({
          title: req.body.title || meal.title,
          description: req.body.description || meal.description,
          price: req.body.price || meal.price,
          image_url: req.body.image || meal.image_url,
          // add for extras
        });

        const { extraIds } = req.body;
        if (extraIds) {
          const uniqueExtraIds = removeDuplicates(extraIds);
          const mealextras = await db.MealExtra.findAll({ where: { mealId: id } });
          for (let i = 0; i < mealextras.length; i += 1) {
            await mealextras[i].destroy();
          }
          await meal.setExtras(uniqueExtraIds, { through: db.MealExtras });
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
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
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
    try {
      const id = parseInt(req.params.id, 10);
      const meal = await db.Meal.findOne({ where: { id: parseInt(req.params.id, 10) } });
      if (meal) {
        await meal.destroy({ paranoid: true });
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
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
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
    const limit = parseInt(req.query.limit, 10) || 30;
    // const page = parseInt(req.query.page, 10) || 1;
    // const offset = limit * (page - 1);
    const offset = req.query.offset || 0;
    try {
      const meals = await db.Meal.findAndCountAll({
        limit,
        offset,
        distinct: true,
        order: [['createdAt', 'DESC']],
        include: [{
          model: db.Extra,
          through: {
            foreignKey: 'extraId',
            attributes: [], // removes join table from response body
            // attributes: { exclude: ['title', 'MealExtra'] },
          },
          as: 'extras',
          // attributes: { exclude: ['title', 'MealExtra'] },
          attributes: ['id', 'title', 'category', 'price'],
        }],
      });
      return res.status(200).json({
        success: true,
        message: 'Meals retrieved',
        meals: meals.rows,
        pagination: pagination(limit, offset, meals.count),
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }

  /**
   * Retrieve meal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async retrieveById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const meal = await db.Meal.findOne({
        where: { id: parseInt(req.params.id, 10) },
        include: [{
          model: db.Extra,
          through: {
            foreignKey: 'extraId',
            attributes: ['title', 'description', 'price'],
          },
          as: 'extras',
        }],
      });
      if (!meal) {
        return res.status(404).json({
          success: false,
          message: `Cannot find meal with id ${id}`,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'meal retrieved',
        meal,
      });
    } catch (error) {
      return res.status(500).json({
        success: 'error',
        message: error.message,
        error,
      });
    }
  }
}

export default MealController;
