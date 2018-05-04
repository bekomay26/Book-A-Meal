import express from 'express';

const errorRouter = express.Router();

errorRouter.route('/*')
  .post((req, res) => {
    res.status(404).send('Page not found');
  });
errorRouter.put('/*', (req, res) => {
  res.status(404).send('Page not found');
});
errorRouter.delete('/*', (req, res) => {
  res.status(404).send('Page not found');
});
errorRouter.route('/*')
  .get((req, res) => {
    res.status(404).send('Page not found');
  });

export default errorRouter;
