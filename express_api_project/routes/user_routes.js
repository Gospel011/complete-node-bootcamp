const express = require('express');

const router = express.Router();

// Request handler functions
const getAllUsers = (req, res) => {
  res.status(501).json({
    status: 'Not implemented',
    message: 'This feature has not been implemented yet',
  });
};

const getUserById = (req, res) => {
  res.status(501).json({
    status: 'Not implemented',
    message: 'This feature has not been implemented yet',
  });
};

const createNewUser = (req, res) => {
  res.status(501).json({
    status: 'Not implemented',
    message: 'This feature has not been implemented yet',
  });
};

const updateUserById = (req, res) => {
  res.status(501).json({
    status: 'Not implemented',
    message: 'This feature has not been implemented yet',
  });
};

const deleteUser = (req, res) => {
  res.status(501).json({
    status: 'Not implemented',
    message: 'This feature has not been implemented yet',
  });
};

// USERS ROUTES
// Get all tours
// Create new tour
router.route('/').get(getAllUsers).post(createNewUser);

// Update tour by id
// Get tour by id
// Delete tour
router.route('/:id').patch(updateUserById).get(getUserById).delete(deleteUser);

module.exports = router;
