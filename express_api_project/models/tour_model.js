const mongoose = require('mongoose');
const slugify = require('slugify');

// CREATING TOUR SCHEMA
// const tourSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: [true, 'Please give this tour a name'],
//       unique: true,
//     },
//     price: {
//       type: Number,
//       required: [true, 'Please specify the price for this tour'],
//     },
//     rating: Number,
//   });

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please give this tour a name'],
      minLength: [5, 'Tour name must be between 5 and 30 characters'],
      maxLength: [30, 'Tour name must be between 5 and 30 characters'],
      trim: true,
      unique: true,
    },
    slug: String,
    duration: Number,
    maxGroupSize: Number,
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'The difficulty can only be either easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      // default: 0.0,
      min: [1, 'The ratingsAverage must be between 1.0 and 50'],
      max: [5, 'The ratingsAverage must be between 1.0 and 50'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0.0,
    },
    price: {
      type: Number,
      required: [true, 'Please give this tour a price'],
    },
    summary: {
      type: String,
      trim: true,
    },
    description: String,
    imageCover: {
      type: String,
      required: [true, 'Your tour must have an image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// CREATING TOUR MODEL
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
