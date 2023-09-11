const Tour = require('./../models/tour_model');
const APIFeatures = require(`./../utils/api_features`);
const util = require('util');
const asyncHandler = require('./../utils/asyn_handler');

const env = process.env.NODE_ENV;

exports.refactorRequestObject = (req, res, next) => {
  // ?fields=name,price,ratingsAverage&sort=-ratingsAverage,price&limit=5
  console.log('Refactoring request object');
  req.query.fields = 'name,price,ratingsAverage,-_id';
  req.query.sort = '-ratingsAverage,price';
  req.query.limit = '5';
  next();
};

exports.createNewTour = asyncHandler(async (req, res, next) => {
  const newDoc = await Tour.create(req.body);
  res.status(201).json({
    status: 'Success',
    message: 'New document created',
    dev: res.dev,
    body: {
      newDoc,
    },
  });

  // TODO implement createNewTour function
});

exports.getAllTours = asyncHandler(async (req, res, next) => {
  console.log(util.inspect(req.query));

  const queryObj = req.query;
  const query = Tour.find();

  let features = new APIFeatures(query, queryObj);

  features.filter().sort().selectFields().paginate();

  // EXECUTE QUERY
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    dev: res.dev,
    results: tours.length,
    body: {
      tours,
    },
  });
});

exports.getTourById = asyncHandler(async (req, res, next) => {
  const tour = await Tour.find({ _id: req.params.id });
  res.status(200);
  res.json({
    status: 'Success',
    statusCode: 200,
    dev: res.dev,
    body: {
      tour,
    },
  });
});

exports.updateTourById = asyncHandler(async (req, res, next) => {
  await Tour.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
  });
  const newTour = await Tour.findById(req.params.id);
  res.status(200);
  res.json({
    status: 'Success',
    statusCode: 200,
    dev: res.dev,
    body: {
      newTour: newTour,
    },
  });
});

exports.deleteTour = asyncHandler(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(200);
  res.json({
    status: 'Success',
    message: 'Tour deleted',
    dev: res.dev,
  });
});

exports.getTourStats = asyncHandler(async (req, res, next) => {
  console.log('In agg try block');
  const results = await Tour.aggregate([
    // Match stage
    {
      $match: { price: { $gt: 800 } },
    },

    // Group stage
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        averageRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        maxRating: { $max: '$ratingsAverage' },
        minRating: { $min: '$ratingsAverage' },
        maxGroupSize: { $max: '$maxGroupSize' },
        minGroupSize: { $min: '$maxGroupSize' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
      },
    },
    // Sort stage
    {
      $sort: { minPrice: 1 },
    },
  ]);

  console.log('In agg try block');
  res.status(200);
  res.json({
    status: 'Success',
    dev: res.dev,
    result: results.length,
    body: results,
  });
});

exports.getTourPlans = asyncHandler(async (req, res, next) => {
  const year = req.params.year * 1;
  const plans = await Tour.aggregate([
    //Unwind startDates for each tour
    {
      $unwind: '$startDates',
    },
    //Select the tours for the specified
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    //Group the tours by month, count the number of tours in each month and specify their names
    {
      $group: {
        _id: { $month: '$startDates' },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    //Sort by numTours in descending order
    {
      $sort: { numTours: -1 },
    },
    //Change the _id field to month field
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    //Show only the first 12 busiest month
    {
      $limit: 12,
    },
  ]);

  res.status(200);
  res.json({
    status: 'Success',
    dev: res.dev,
    result: plans.length,
    body: plans,
  });
});
