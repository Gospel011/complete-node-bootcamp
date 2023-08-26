const Tour = require('./../models/tour_model')
const fs = require('fs');
const { getTour, updateToursFile } = require('./functions');
const { tours } = require('./../app.js');

exports.createNewTour = (req, res) => {
  // TODO implement createNewTour function
};

exports.getAllTours = (req, res) => {
  // res.json({
  //   status: 'success',
  //   statusCode: 200,
  //   results: tours.length,
  //   body: {
  //     tours: tours,
  //   },
  // });
};

exports.getTourById = (req, res) => {
  // res.status(200);
  // res.json({
  //   status: 'Success',
  //   statusCode: 200,
  //   body: {
  //     tour: tour,
  //   },
  // });
};

exports.updateTourById = (req, res) => {
  // updateToursFile(req, res, message = 'Tour updated successfully', tour);
};

exports.deleteTour = (req, res) => {
// TODO implement deleteTour function
};
