//Wrapper for async functions. This functions helps us catch async errors so we'll not have to do it in all our controllers

module.exports = (func) => {
  return (req, res, next) => {
    console.log('Inside Async handler function');
    func(req, res, next).catch((err) => next(err));
  };
};
