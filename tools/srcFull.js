import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import compression from 'compression';
import open from 'open';
import config from '../webpack.config.dev';
import mealRouter from '../server/routes/mealRoutes';
import menuRouter from '../server/routes/menuRoutes';
import orderRouter from '../server/routes/orderRoutes';
import authRouter from '../server/routes/authRoutes';
import extraRouter from '../server/routes/extraRoutes';
import errorRouter from '../server/routes/errorRoutes';

const app = express();
const port = 4000;
// const port = process.env.PORT || 3000;


app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/extras', extraRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

// app.use('/*', errorRouter);
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

export default app;
