import Controller from './Controller';
import Meal from '../models/Meal';
import meals from '../tests/dummyData/fakeData';

class MealController extends Controller {
  static createMeal(req, res) {
    const {
      title,
      description,
      image,
      price,
    } = req.body;

    // if title or price field are empty output error message
    if (!title || !price) {
      return res.status(400).json({
        status: 'error',
        message: 'Failure: Input missing field',
      });
    }

    const lenOfId = meals.length;
    const id = meals[lenOfId - 1].id + 1;
    const meal = new Meal(id, title, description, image, price);

    // if meal array is not empty set the id to the last element + 1 else, set it to zero
    meals.push(meal);
    console.log(meals);
    return res.status(201).json({
      message: 'Success: Meal created',
    });
  }
}

export default MealController;
