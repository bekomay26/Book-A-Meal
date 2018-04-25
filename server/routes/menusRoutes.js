import express from 'express';
import MenuController from '../controllers/MenuController';

const menusRouter = express.Router();

menusRouter.route('/')
  .post(MenuController.createMenu);
// menuRouter.put('/:id', MenuController.update);
// menuRouter.delete('/:id', MenuController.destroy);
// menuRouter.route('/')
//   .get(MenuController.retrieveAll);

export default menusRouter;
