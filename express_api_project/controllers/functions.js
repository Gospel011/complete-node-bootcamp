const fs = require('fs');
const { tours } = require('./../app.js');
const toursPath = `${__dirname}/../../complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json`;

const getTour = (req) => {
  const id = req.params.id * 1;
  console.log(`id = ${id}`);
  const tour = tours.find((el) => el.id === id);
  return tour;
};

exports.updateToursFile = (
  req,
  res,
  message,
  tour,
  path = toursPath,
  new_tour = JSON.stringify(tours)
) => {
  fs.writeFile(path, new_tour, (err) => {
    if (err) {
      res.status(500);
      res.json({
        status: 'Failed',
        statusCode: 500,
        message: 'Something happened, operation not successful.',
      });
    } else {
      res.status(200);
      res.json({
        status: 'Success',
        statusCode: 200,
        message: message,
        requestTime: req.requestTime,
        body: {
          tour: tour,
        },
      });
    }
  });
};

// Middleware functions
exports.validateID = (req, res, next, val) => {
  console.log(`Validating id from the param middleware. id = ${val}`);
  const tour = getTour(req);
  if (tour === undefined) {
    res.status(404);
    return res.json({
      status: 'Failed',
      statusCode: 404,
      message: 'No tour found for that id.',
    });
  }
  console.log('Running param next function');
  next();
};

exports.checkBody = (req, res, next) => {
  const isInvalid = !req.body.name || !req.body.price;
  if (isInvalid) {
    return res.status(400).json({
      status: 'Bad request',
      message: "Request body must contain 'name' and 'price' properties",
    });
  } else {
    console.log(
      'This is a valid request containing both the name and price properties'
    );
  }
  next();
};

exports.getTour = getTour;
