const EventEmitter = require('events');
const http = require('http');
const fs = require('fs');



// class Sales extends EventEmitter{
//     constructor(){
//         super();
//         console.log('New sales emitter created');
//     }
// }


// const myEmitter = new Sales();

// console.log('Events scripts begins.');


// myEmitter.on('Sale', () => {
//     console.log('A new sale has occured');
// })
// myEmitter.on('Sale', (price) => {
//     console.log(`Someone purchased $${price} worth of goods.\nNew store balance = \$9.7T with 99% profits.`);
// })

// myEmitter.emit('Sale', '300,000,000,000,000');

// console.log('______________________________________________________________')


//////////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) =>{
    const readStream = fs.createReadStream('./complete-node-bootcamp/README.md', 'utf-8');
    readStream.pipe(res, {end: false});
    readStream.on('finish', () => {
        console.log('File read finished! From "finish" listener');
    });

    readStream.on('end', ()=>{
        console.log('request urs is ' + req.url);
        console.log('File read finished! From "end" listener');
        res.end();
    })
    // console.log(`This is a request from ${req.url}`);
    // res.write(`Your request url is ${req.url}`);
});

server.on('close', ()=>{
    console.log('Server was closed');
})

server.listen(1000, '127.0.0.1', ()=>{
    console.log('server is live now and listening for requests');
})