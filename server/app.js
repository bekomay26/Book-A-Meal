import express from 'express';
import bodyParser from 'body-parser';
import mealRouter from './routes/mealRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to be added before all mealRouter routes
app.use('/api/v1/meals', mealRouter);
// const urlPrefix = '/api/v1';
// app.get('/meals', () => {

// });

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

export default app;
