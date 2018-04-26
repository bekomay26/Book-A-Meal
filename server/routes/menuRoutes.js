import express from 'express';
import MenuController from '../controllers/MenuController';

const menuRouter = express.Router();

menuRouter.route('/')
  .post(MenuController.createMenu);
menuRouter.route('/')
  .get(MenuController.retrieveDayMenu);
// menuRouter.put('/:id', MenuController.update);
// menuRouter.delete('/:id', MenuController.destroy);
// menuRouter.route('/')
//   .get(MenuController.retrieveAll);

export default menuRouter;
