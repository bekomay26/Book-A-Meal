import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mealRouter from './routes/mealRoutes';
import menuRouter from './routes/menuRoutes';
import orderRouter from './routes/orderRoutes';
import authRouter from './routes/authRoutes';
import errorRouter from './routes/errorRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/auth', authRouter);


app.get('/', (req, res) => {
  res.send('Book-A-Meal');
});

// api documentation
<<<<<<< HEAD
app.use('api/v1/docs', express.static(path.join(__dirname, './documentation')));
=======
app.use('/documentation', express.static(path.join(__dirname, './docs')));
>>>>>>> a5555fe9fa7ad538c6e773a6a44aa6e8aed468e7

app.use('/*', errorRouter);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

export default app;
