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
  static async deleteExtra(req, res) {
    const id = parseInt(req.params.id, 10);
    const extra = await db.Extra
      .findOne({ where: { id: parseInt(req.params.id, 10) } });
    if (extra) {
      await extra.destroy();
    } else {
      return res.status(404).json({
        success: false,
        message: `Cannot find meal with id ${id}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Meal deleted',
    });
  }

  /**
   * Retrieves all Meals
   * @memberof ExtraController
   * @param {object} req
   * @param {object} res
   * @returns {(json)}JSON object
   * @static
   */
  static async retrieveAll(req, res) {
    try {
      const extras = await db.Extra.findAll();
      return res.status(200).json({
        success: true,
        message: 'Extras retrieved',
        extras,
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

export default ExtraController;
