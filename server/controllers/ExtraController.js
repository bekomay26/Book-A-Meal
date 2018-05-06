import Controller from './Controller';
// import meals from '../tests/dummyData/fakeData';
import db from '../model/index';

class ExtraController extends Controller {
  static async createExtra(req, res) {
    const {
      title,
      price,
      category,
    } = await req.body;

    // if title or price field are empty output error message
    if (!title || !price) {
      return res.status(400).json({
        success: false,
        message: 'Input missing field',
      });
    }

    const extra = await db.Extra.create({
      title,
      price,
      category,
    });

    return res.status(201).json({
      success: true,
      message: 'Extra created',
      extra,
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
}

export default ExtraController;
