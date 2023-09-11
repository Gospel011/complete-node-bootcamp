process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION  🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  console.log(err.stack);
});

// SYNCHRONOUS OPERATIONS
const {
  deletAllDocuments,
  loadTourToDatabase,
} = require('./controllers/functions');
try {
  deletAllDocuments().then((_) => {
    console.log('All documents deleted');

    loadTourToDatabase().then((_) => {
      console.log('Tours file loaded to database');
    });
  });
} catch (error) {
  console.log(error.message);
}

const mongoose = require('mongoose');
require('dotenv').config();
const { app } = require('./app');

const portNumber = process.env.PORT;
console.log(`process.env = ${process.env.NODE_ENV}`);

const PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DATABASE.replace('<PASSWORD>', PASSWORD);

// CONNECTING TO DATABASE
console.log('Connecting to database...');
// console.log(`db = ${process.env.LOCAL_DATABASE}`);
process.env.NODE_ENV === 'development'
  ? mongoose
      .connect(process.env.LOCAL_DATABASE, {
        // .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then((con) => {
        console.log('Development Database connection successfull!');
      })
  : mongoose
      .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then((con) => {
        console.log('Production Database connection successfull!');
      });

// STARTING SERVER
const server = app.listen(portNumber, () => {
  console.log(`App is listening for requests on port ${portNumber}`);
  module.exports = server;
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION  🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥');
  console.log(err.stack);
  server.close((_) => {
    process.exit(1);
  });
});

// console.log(names);
