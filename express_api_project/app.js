const fs = require('fs');
const express = require('express');
const { resolve } = require('path');
const { rejects } = require('assert');
const app = express();
app.use(express.json());

const portNumber = 8000;

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json`,
    'utf-8'
  )
);

const asyncWriteFile = async (filePath, text) => {
  return Promise((resolve, reject) => {
    fs.writeFile(filePath, text, (err) => {
      err
        ? reject('The file was not written successfully')
        : resolve('File written successfully');
    });
  });
};

//CREATE--Post requests
app.post('/api/vi/tours', (req, res) => {
  new_tour = req.body;
  console.log(tours.push(new_tour));
  fs.writeFile(
    `./complete-node-bootcamp/4-natours/starter/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      err ? console.log(err.message) : console.log('File written successfully');
    }
  );
  res.send('Done');
});

// READ--Get requests
app.get('/api/vi/tours', (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    results: tours.length,
    body: {
      tours: tours,
    },
  });
});

app.listen(portNumber, () => {
  console.log(`App is listening for requests on port ${portNumber}`);
});
