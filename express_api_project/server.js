const mongoose = require('mongoose');

require('dotenv').config();
const { app } = require('./app');

const portNumber = process.env.PORT;
console.log(`process.env = ${process.env.NODE_ENV}`);

const PASSWORD = process.env.DB_PASSWORD;
const DB = process.env.DATABASE.replace('<PASSWORD>', PASSWORD);

// CONNECTING TO DATABASE

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log('Database connection successfull!');
  });
  

// STARTING SERVER
app.listen(portNumber, () => {
  console.log(`App is listening for requests on port ${portNumber}`);
});
