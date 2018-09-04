import express from 'express';
import multer from 'multer';
import MealController from '../controllers/MealController';
import mealValidate from '../validations/mealValidation';
import Authentication from '../middleware/Authentication';
import validateHelper from '../validations/ValidationHelper';

const mealRouter = express.Router();
mealRouter.use(Authentication.verifyUser, Authentication.checkAdmin);
/**
 * Storage location for multer middleware
 */
const storage = multer.diskStorage({
  destination: 'server/temp/',
  filename: (req, file, callback) => {
    callback(null, Number(Date.now()) + file.originalname);
  },
});
// get function to enable multer capture uploaded images
const upload = multer({ storage });

mealRouter.route('/')
  .post(upload.single('image'), mealValidate.create, validateHelper.validate, MealController.createMeal);
mealRouter.route('/:id').put(upload.single('image'), mealValidate.update, validateHelper.validate, MealController.updateMeal);
// mealRouter.put('/:id', mealValidate.update, validateHelper.validate, MealController.updateMeal);
mealRouter.delete('/:id', mealValidate.delete, validateHelper.validate, MealController.deleteMeal);
mealRouter.get('/:id', MealController.retrieveById);
mealRouter.route('/')
  .get(MealController.retrieveAll);
export default mealRouter;
