const EventEmitter = require('events');

const myEmitter = new EventEmitter();


myEmitter.on('Sale', () => {
    console.log('A new sale has occured');
})
myEmitter.on('Sale', (price) => {
    console.log(`Someone purchased $${price} worth of goods.\nNew store balance = \$9.7T with 99% profits.`);
})

myEmitter.emit('Sale', '300,000,000,000,000');

