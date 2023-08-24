const fs = require('fs');
const { getTour, updateToursFile } = require('./functions');
const { tours } = require('./../app.js');

exports.createNewTour = (req, res) => {
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
          newTourId: new_id,
        });
        console.log('File written successfully');
      }
    }
  );
};

exports.getAllTours = (req, res) => {
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

exports.getTourById = (req, res) => {
  console.log('Get tour by id');
  const tour = getTour(req);
  console.log(tour);

  res.status(200);
  res.json({
    status: 'Success',
    statusCode: 200,
    body: {
      tour: tour,
    },
  });
};

exports.updateTourById = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex((el) => el.id === id);
  let tour = tours.find((el) => el.id === id);
  tour = Object.assign(tour, req.body);
  tours[tourIndex] = tour;

  updateToursFile(req, res, message = 'Tour updated successfully', tour);
};

exports.deleteTour = (req, res) => {
  let tour = getTour(req);

  tours.splice(tours.indexOf(tour), 1);

  updateToursFile(req, res, message = 'Tour deleted', tour = null);
};
