import Controller from './Controller';
import { Meal, mealsObject } from '../models/Meal';

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
    const meal = new Meal(title, description, image, price);
    const lenOfId = mealsObject.meals.length;

    // if meal array is not empty set the id to the last element + 1 else, set it to zero
    if (lenOfId !== 0) {
      meal.setId(mealsObject.meals[lenOfId - 1].id + 1);
    } else {
      meal.setId(0);
    }
    mealsObject.meals.push(meal);
    console.log(mealsObject.meals);
    return res.status(201).json({
      message: 'Success: Meal created',
    });
  }
}

export default MealController;
