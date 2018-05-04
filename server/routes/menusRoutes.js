import express from 'express';
import MenusController from '../controllers/MenusController';
import menuValidate from '../validation/menuValidation';
import validateHelper from '../validation/validationHelper';

const menusRouter = express.Router();

menusRouter.route('/')
  .post(menuValidate.create, validateHelper.validate, MenusController.addMenu);
menusRouter.route('/')
  .get(MenusController.retrieveTodaysMenu);
menusRouter.route('/:id').delete(MenusController.deleteMenu);

export default menusRouter;
