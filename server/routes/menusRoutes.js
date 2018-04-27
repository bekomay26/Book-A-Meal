import express from 'express';
import MenusController from '../controllers/MenusController';

const menusRouter = express.Router();

menusRouter.route('/')
  .post(MenusController.addMenu);
// menuRouter.put('/:id', MenuController.update);
// menuRouter.delete('/:id', MenuController.destroy);
// menuRouter.route('/')
//   .get(MenuController.retrieveAll);

export default menusRouter;
