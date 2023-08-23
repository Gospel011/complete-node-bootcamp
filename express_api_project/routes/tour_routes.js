const fs = require('fs');
const express = require('express');


const router = express.Router();

const toursPath = `${__dirname}/../../complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursPath, 'utf-8'));


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
      ? Object.assign(req.body, {
          id: new_id,
        })
      : Object.assign(
          {
            id: new_id,
          },
          req.body
        );
  
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
    } else {
      res.status(200);
      res.json({
        status: 'Success',
        statusCode: 200,
        body: {
          tour: tour,
        },
      });
    }
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
  
  const deleteTour = (req, res) => {
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
  };


// TOURS ROUTES

// Get all tours
// Create new tour
router
    .route('/')
    .get(getAllTours)
    .post(createNewTour);

// Update tour by id
// Get tour by id
// Delete tour
router
    .route('/:id')
    .patch(updateTourById)
    .get(getTourById)
    .delete(deleteTour);

module.exports = router;