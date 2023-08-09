// ./../complete-node-bootcamp/2-how-node-works/starter/test-file.txt

const fs = require('fs');
const crypto = require('crypto');


console.log('Hi from top-level code');

setTimeout(()=> {
    const date = Date.now()

    // Timer
    setTimeout(() => {
        console.log('3 seconds timer finished');
    }, 0);

    // I/O task
    const text = fs.readFile('./../complete-node-bootcamp/2-how-node-works/starter/test-file.txt', 'utf-8', (data, err) => {
        console.log('finishen I/O file read task');
    });

    // setImmediate callback
    setImmediate(()=>{
        console.log('setImmediate callback finished');
    })

    //process.nextTick
    process.nextTick(()=>{
        console.log('process.nextTick callback called');
    });

    //password encryption which is a more involved task that would be offloaded to the threadpool
    crypto.pbkdf2('secret_password', 'salt', 100000, 200, 'sha512', (err, derivedKey) => {
        console.log((Date.now() - date)/1000, `Encrypted password = ${derivedKey}`);
    });


    crypto.pbkdf2('secret_password', 'salt', 100000, 200, 'sha512', (err, derivedKey) => {
        console.log((Date.now() - date)/1000, `Encrypted password = ${derivedKey}`);
    });


    crypto.pbkdf2('secret_password', 'salt', 100000, 200, 'sha512', (err, derivedKey) => {
        console.log((Date.now() - date)/1000, `Encrypted password = ${derivedKey}`);
    });

    
    crypto.pbkdf2('secret_password', 'salt', 100000, 200, 'sha512', (err, derivedKey) => {
        console.log((Date.now() - date)/1000, `Encrypted password = ${derivedKey}`);
    });


    crypto.pbkdf2('secret_password', 'salt', 100000, 200, 'sha512', (err, derivedKey) => {
        console.log((Date.now() - date)/1000, `Encrypted password = ${derivedKey}`);
    });


}, 0);