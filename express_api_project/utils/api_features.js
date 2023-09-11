class APIFeatures {
  constructor(query, queryObj) {
    this.query = query; // This is the query object
    this.queryObj = queryObj; // This is the query string i.e req.query
    console.log(`this.query = ${this.query}`);
  }

  filter() {
    // NORMAL FILTERING
    let query = { ...this.queryObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete query[el]);

    // ADVANCED FILETERING (filter for gte|gt|lte|lt)
    query = JSON.parse(
      JSON.stringify(query).replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`,
      ),
    );

    // Attach find query to this.query
    this.query.find(query);
    // let tours = Tour.find(query);
    return this;
  }

  sort() {
    // SORTING
    if (this.queryObj.sort) {
      const sortString = this.queryObj.sort.split(',').join(' ');
      this.query.sort(sortString);
    }
    return this;
  }

  selectFields() {
    // SELECTING FIELDS
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(',').join(' ');
      this.query.select(fields);
    } else {
      this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // PAGINATION -- Used for breaking the documents in our collection into different pages
    if (this.queryObj.page && this.queryObj.page * 1 >= 0) {
      const page = this.queryObj.page * 1 || 1;
      const limit = this.queryObj.limit * 1 || 5;
      const skip = (page - 1) * limit;

      this.query.skip(skip).limit(limit);
    } else if (this.queryObj.limit) {
      const limit = this.queryObj.limit * 1 || 5;
      this.query.limit(limit);
    } else {
      const page = 1;
      const limit = 3;
      const skip = (page - 1) * limit;
      this.query.skip(skip).limit(limit);
    }
    return this;
  }
}

module.exports = APIFeatures;
