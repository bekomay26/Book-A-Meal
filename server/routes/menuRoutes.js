import express from 'express';
import MenuController from '../controllers/MenuController';
import menuValidate from '../validations/menuValidation';
import Authentication from '../middleware/Authentication';
import validateHelper from '../validations/ValidationHelper';

const menuRouter = express.Router();

menuRouter.route('/')
  .get(MenuController.retrieveDayMenu);
menuRouter.route('/')
  .post(
    Authentication.verifyUser, Authentication.checkAdmin, menuValidate.createDay,
    validateHelper.validate, MenuController.createDaysMenu,
  );
menuRouter.route('/future')
  .post(
    Authentication.verifyUser, Authentication.checkAdmin, menuValidate.create,
    validateHelper.validate, MenuController.createMenu,
  );
// menuRouter.put('/:id', MenuController.update);
// menuRouter.delete('/:id', MenuController.destroy);
// menuRouter.route('/')
//   .get(MenuController.retrieveAll);

export default menuRouter;
