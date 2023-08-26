const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());

console.log(`process = ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV == 'development') {
  console.log('Using morgan');
  app.use(morgan('dev'));
}

const toursPath = `${__dirname}/../complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json`;
exports.tours = JSON.parse(fs.readFileSync(toursPath, 'utf-8'));

const tourRouter = require('./routes/tour_routes');
const userRouter = require('./routes/user_routes.js');

// Top level constants

console.log('Running app.js');

// Middleware functions
const addTime = (req, res, next) => {
  const date = new Date();

  req[
    'requestTime'
  ] = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(req.requestTime);
  next();
};

// My custom middlewares
app.use(addTime);

// Routes or Endpoints

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

exports.app = app;
