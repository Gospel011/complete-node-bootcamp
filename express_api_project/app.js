const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(morgan('dev'));

const tourRouter = require('./routes/tour_routes');
const userRouter = require('./routes/user_routes.js');

// Top level constants
const portNumber = 8000;

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

app.listen(portNumber, () => {
  console.log(`App is listening for requests on port ${portNumber}`);
});
