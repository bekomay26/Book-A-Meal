import express from 'express';
import MenusController from '../controllers/MenusController';

const menusRouter = express.Router();

menusRouter.route('/')
  .post(MenusController.addMenu);
menusRouter.route('/')
  .get(MenusController.retrieveTodaysMenu);
menusRouter.route('/:id').delete(MenusController.deleteMenu);

export default menusRouter;
