require('dotenv').config();
const { app } = require('./app');

// dotenv();

const portNumber = process.env.PORT;
console.log(`process.env = ${process.env.NODE_ENV}`);
app.listen(portNumber, () => {
  console.log(`App is listening for requests on port ${portNumber}`);
});
