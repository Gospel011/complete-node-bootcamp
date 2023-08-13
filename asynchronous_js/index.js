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

const asyncAppendFile = (destinationPath, resource) =>{
    return new Promise((resolve, reject) => {
        fs.appendFile(destinationPath, `${resource}\n`, (err) =>{
            err
            ? reject('Sorry something happened so the file was not written successfully')
            : console.log('File appended')
        })
    })
}


const getRandomDogPicture = async (num) => {
    try {const filedata = await asyncReadFile(`../complete-node-bootcamp/3-asynchronous-JS/starter/dog.txt`);
    console.log(`Dog breed = ${filedata}`);

    const url = `https://dog.ceo/api/breed/${filedata}/images/random`;

    let response = [];

    for(let count=0; count < num; count++){
        response.push(superagent.get(url));
    }
    
    const responses = await Promise.all(response)

    const dog_images = responses.map(response => {
        return response.body.message
    })
    console.log(dog_images);

    const writePromises = dog_images.map(dog_image => asyncAppendFile('dog_image.txt', dog_image))
    await Promise.all(writePromises);


    // console.log(`Image url gotten is ${response.body.message}`);
    // await asyncWriteFile('dog_image.txt', response.body.message);
    // console.log('Random picture gotten and written to file.')
    } catch(err){
        console.log(`The error from catch block is ${err}`);
        throw(err)
    }
    return 'Dog pictures ready.'
}


getRandomDogPicture(100)


/*
(async () => {
    try{
        console.log('Getting random dog picture');
        const output = await getRandomDogPicture();
        console.log(output);
        console.log('Done getting the dog pictures');
    }catch (err){
        console.log(err)
    }
})()
*/



// asyncReadFile(`../complete-node-bootcamp/3-asynchronous-JS/starter/dog.txt`)
//     .then(data=>{
//         console.log(`Dog breed = ${data}`);
//         url = 'https://dog.ceo/api/breed/hound/images/random';
        
//         return superagent.get(url);
//     })
//     .then(res=>{
//         const dog_image_url = res.body.message;

//         return asyncWriteFile('dog_image.txt', dog_image_url)})
//     .then(data =>{
//         console.log(data);
//     })
//     .catch(err => {

//         console.log(`Error = ${err}`);

//     })