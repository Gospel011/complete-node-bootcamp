const fs = require('fs');
const Tour = require('./../models/tour_model');

exports.loadTourToDatabase = async () => {
  try {
    const path =
      './complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json';
    const tours = JSON.parse(fs.readFileSync(path, 'utf-8'));
    // console.log(tours);
    await Tour.insertMany(tours);
  } catch (error) {
    console.log(error.message);
  }
};

exports.deletAllDocuments = async () => {
  const res = await Tour.deleteMany({});
  console.log(`result of db delete operation = ${res}`);
};

exports.defaultResParameters = (req, res, next) => {
  res.dev = {
    env: process.env.NODE_ENV,
    db:
      process.env.NODE_ENV === 'production'
        ? 'MongoDB Cloud'
        : 'MongoDB Compass',
    query: req.query,
  };
  next();
};

// exports.getTour = getTour;
