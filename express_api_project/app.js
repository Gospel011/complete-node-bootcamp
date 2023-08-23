const fs = require('fs');
const express = require('express');
const { resolve } = require('path');
const { rejects } = require('assert');
const app = express();
app.use(express.json());

// Top level constants
const portNumber = 8000;

const toursPath = `${__dirname}/../complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursPath, 'utf-8'));

// Middleware functions
const addTime = (req, res, next) => {
  const date = new Date()

  req['requestTime'] = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  console.log(req.requestTime)
  next();
};

// My custom middlewares
app.use(addTime);

// Functions
const getTour = (req) => {
  const id = req.params.id * 1;
  console.log(`id = ${id}`);
  const tour = tours.find((el) => el.id === id);
  return tour;
};

const updateToursFile = (
  callback,
  path = toursPath,
  new_tour = JSON.stringify(tours)
) => {
  fs.writeFile(path, new_tour, (err) => {
    callback(err);
  });
};

// Request handler functions
const createNewTour = (req, res) => {
  const new_id = tours.length === 0 ? 0 : tours[tours.length - 1].id + 1;

  console.log(new_id);
  const new_tour = req.body.hasOwnProperty('id')
    ? Object.assign(req.body, { id: new_id })
    : Object.assign({ id: new_id }, req.body);

  console.log(`bool = ${req.body.hasOwnProperty('id')}`);

  console.log(tours.push(new_tour));
  fs.writeFile(
    `./complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        console.log(err.message);
      } else {
        res.status(201);
        res.json({
          status: 'New tour created',
          statusCode: 201,
        });
        console.log('File written successfully');
      }
    }
  );
};

const getAllTours = (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    statusCode: 200,
    results: tours.length,
    body: {
      tours: tours,
    },
  });
};

const getTourById = (req, res) => {
  console.log('Get tour by id');
  const tour = getTour(req);
  console.log(tour);

  if (tour === undefined) {
    res.status(404);
    res.json({
      status: 'Failed',
      statusCode: 404,
      message: 'No tour found for that id.',
    });
  }
  res.status(200);
  res.json({
    status: 'Success',
    statusCode: 200,
    body: {
      tour: tour,
    },
  });
};

const updateTourById = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex((el) => el.id === id);
  let tour = tours.find((el) => el.id === id);
  tour = Object.assign(tour, req.body);
  tours[tourIndex] = tour;

  fs.writeFile(
    `./complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500);
        res.json({
          status: 'Failed',
          statusCode: 500,
          message:
            "Something happened, so your request couldn't be completed successfully",
        });
      } else {
        res.status(200);
        res.json({
          status: 'Success',
          statusCode: 200,
          message: 'Tour updated successfully',
          requestTime: req.requestTime,
          body: {
            tour: tour,
          },
        });
      }
    }
  );
};

// Routes or Endpoints

//CREATE--Post requests
// 1. Create new tour
app.route('/api/v1/tours').post(createNewTour);

// READ--Get requests
//  1. Get all tours
//  2. Get tour from id
app.route('/api/v1/tours').get(getAllTours);

// PATCH--Update tour by id
app.route('/api/v1/tours/:id').patch(updateTourById).get(getTourById);

// DELETE--Delete tour by id
app.route('/api/v1/tours/:id').delete((req, res) => {
  const tour = getTour(req);

  if (tour === undefined) {
    res.status(404);
    res.json({
      status: 'Failed',
      statusCode: 404,
      message: 'No tour found for that id.',
    });
  } else {
    tours.splice(tours.indexOf(tour), 1);
  }

  updateToursFile((err) => {
    if (err) {
      res.status(500);
      res.json({
        status: 'Failed',
        statusCode: 500,
        message: 'Something happened, tour was not successfully deleted',
      });
    } else {
      res.status(200);
      res.json({
        status: 'Success',
        statusCode: 200,
        message: 'Tour deleted',
        body: {
          tour: null,
        },
      });
    }
  });
});

app.listen(portNumber, () => {
  console.log(`App is listening for requests on port ${portNumber}`);
});
