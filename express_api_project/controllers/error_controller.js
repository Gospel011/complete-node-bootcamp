const AppError = require('../utils/error_class');

const handleValidationError = (err) => {
  const message = Object.values(err.errors)
    .map((el) => el.message)
    .join('. ');
  // console.log(err);
  console.log('MESSAGE 📧', message);
  // err.isOperational = true;
  return new AppError(message, 400);
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  console.log('MESSAGE FROM CAST ERROR HANDLER📧', message);
  // err.isOperational = true;
  return new AppError(message, 400);
};

const handleDuplicateKeyError = (err) => {
  const message = `${Object.keys(err.keyValue)}: '${Object.values(
    err.keyValue,
  )}' already exists`;
  console.log('MESSAGE FROM DUPLICATE KEY ERROR HANDLER📧', message);
  // err.isOperational = true;
  return new AppError(message, 400);
};

const sendProductionError = (err, res) => {
  // Trusted operational errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming Errors
  } else {
    // 1. Log error to console
    console.error('SOME ERROR OCCURED:', err);

    // 2. Send generic response to client
    res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
};

const sendDevelopmentError = (err, res) => {
  console.log('ERROR NAME', err.name);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    stack: err.stack,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  console.log('Handled error from global error handling middleware');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    // Development response
    sendDevelopmentError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // Production response
    let error = { ...err };
    console.log('ERROR OBJECT', err.name);
    if (err.name === 'ValidationError') {
      console.log(err);
      error = handleValidationError(err);
    } else if (err.name === 'CastError') {
      error = handleCastError(err);
    } else if (err.code === 11000) {
      error = handleDuplicateKeyError(err);
    }
    sendProductionError(error, res);
  }
};
