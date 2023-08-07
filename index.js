const fs = require('fs');

fs.readFile(
    path = `${__dirname}/complete-node-bootcamp/node-farm/final/dev-data/data.json`,
    'utf-8',
    callback = (err, data) => {
        err == null ? console.log(data) : console.log('Something happened. Try again!');
        // console.log(__dirname);
    },
    );
    
    
    console.log('Reading file...');
