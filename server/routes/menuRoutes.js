import express from 'express';
import MenuController from '../controllers/MenuController';
import Authentication from '../middleware/Authentication';

const menuRouter = express.Router();

menuRouter.route('/')
  .get(MenuController.retrieveDayMenu);
menuRouter.route('/')
  .post(Authentication.verifyUser, Authentication.checkAdmin, MenuController.createMenu);
// menuRouter.put('/:id', MenuController.update);
// menuRouter.delete('/:id', MenuController.destroy);
// menuRouter.route('/')
//   .get(MenuController.retrieveAll);

export default menuRouter;
