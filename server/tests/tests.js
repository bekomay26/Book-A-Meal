import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import mealRouter from '../routes/mealRoutes';
import menuRouter from '../routes/menuRoutes';
import orderRouter from '../routes/orderRoutes';
import authRouter from '../routes/authRoutes';
import settings from '../config/config.json';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('superSecret', settings.test.secret);
app.set('token', settings.test.token);

app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/auth', authRouter);


app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

export default app;
