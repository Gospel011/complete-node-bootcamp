const express = require('express');
const tourController = require('./../controllers/tour_controller.js');
const { defaultResParameters } = require('./../controllers/functions');

const router = express.Router();
// router.param('id', validateID)

// Functions

// TOURS ROUTES

// Get all tours
// Create new tour
router
  .route('/')
  .get(defaultResParameters, tourController.getAllTours)
  .post(defaultResParameters, tourController.createNewTour);

// Alias tour routes
router
  .route('/best-five-cheap-routes')
  .get(
    defaultResParameters,
    tourController.refactorRequestObject,
    tourController.getAllTours,
  );

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/tour-plans/:year').get(tourController.getTourPlans);

// Update tour by id
// Get tour by id
// Delete tour
router
  .route('/:id')
  .patch(defaultResParameters, tourController.updateTourById)
  .get(defaultResParameters, tourController.getTourById)
  .delete(defaultResParameters, tourController.deleteTour);

module.exports = router;
