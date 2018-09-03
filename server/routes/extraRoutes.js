import express from 'express';
import ExtraController from '../controllers/ExtraController';

const extraRouter = express.Router();
extraRouter.route('/')
  .get(ExtraController.retrieveAll);
export default extraRouter;
