
const express = require('express');
const tourController = require('./../controllers/tour_controller.js');
const {validateID, checkBody} = require('./../controllers/functions')



const router = express.Router();
router.param('id', validateID)


// Functions


// TOURS ROUTES

// Get all tours
// Create new tour
router.route('/').get(tourController.getAllTours).post(checkBody, tourController.createNewTour);

// Update tour by id
// Get tour by id
// Delete tour
router.route('/:id').patch(tourController.updateTourById).get(tourController.getTourById).delete(tourController.deleteTour);

module.exports = router;
