const mongoose = require('mongoose');

// CREATING TOUR SCHEMA
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please give this tour a name'],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Please specify the price for this tour'],
    },
    rating: Number,
  });
  
  // CREATING TOUR MODEL
  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;