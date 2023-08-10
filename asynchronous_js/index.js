const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const asyncReadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data)=>{
            err
            ? reject('Sorry something happened so the file can\'t be read successfully')
            : resolve(data);
        })
    })
}

const asyncWriteFile = (destinationPath, resource) =>{
    return new Promise((resolve, reject) => {
        fs.writeFile(destinationPath, resource, (err) =>{
            err
            ? reject('Sorry something happened so the file was not written successfully')
            : resolve(`File written successfully. ${resource}`)
        })
    })
}



asyncReadFile(`../complete-node-bootcamp/3-asynchronous-JS/starter/dog.txt`)
    .then(data=>{
        console.log(`Dog breed = ${data}`);
        url = 'https://dog.ceo/api/breed/hound/images/random';
        
        return superagent.get(url);
    })
    .then(res=>{
        const dog_image_url = res.body.message;

        return asyncWriteFile('dog_image.txt', dog_image_url)})
    .then(data =>{
        console.log(data);
    })
    .catch(err => {

        console.log(`Error = ${err.message}`);

    })