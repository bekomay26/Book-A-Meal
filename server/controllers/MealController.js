import Controller from './Controller';
// import meals from '../tests/dummyData/fakeData';
import db from '../model/index';

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

    // const lenOfId = meals.length;
    // const id = meals[lenOfId - 1].id + 1;
    // const meal = new Meal(id, title, description, image, price, extras, 1); // initialize qty to 1
    // // if meal array is not empty set the id to the last element + 1 else, set it to zero
    // meals.push(meal);
    const meal = await db.Meal.create({
      title,
      description,
      image_url: image,
      price,
    });
    let exists;
    // await req.body.extraIds.map(async id =>
    for (let i = 0; i < extraIds.length; i++) {
      exists = await db.Extra.findOne({ where: { id: extraIds[i] } });
      if (exists) {
        await db.MealExtra.create({ extraId: extraIds[i], mealId: meal.id });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Extra not found',
        });
      }
    }
    return res.status(201).json({
      success: true,
      message: 'Meal created',
      meal,
    });
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
            image_url: req.body.image,
            // extras: req.body.extras,
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
