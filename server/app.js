import express from 'express';
import bodyParser from 'body-parser';
import mealRouter from './routes/mealRoutes';
import menusRouter from './routes/menusRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/menus', menusRouter);


app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

export default app;
