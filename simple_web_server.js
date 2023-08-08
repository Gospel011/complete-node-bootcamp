
const http = require('http');
const fs = require('fs');
const url = require('url');

// THIRD PARTY MODULES

const slugify = require('slugify');

// MY OWN MODULES
const replaceAllTemplates = require(`${__dirname}/modules/replace_all_template.js`);
const select_display_product = require(`${__dirname}/modules/select_display_product.js`);


const template_overview = fs.readFileSync(`${__dirname}/complete-node-bootcamp/node-farm/starter/templates/template_overview.html`, 'utf-8')
const template_product = fs.readFileSync(`${__dirname}/complete-node-bootcamp/node-farm/starter/templates/template_product.html`, 'utf-8')
const template_card = fs.readFileSync(`${__dirname}/complete-node-bootcamp/node-farm/starter/templates/template_card.html`, 'utf-8')

const products = fs.readFileSync(`${__dirname}/complete-node-bootcamp/node-farm/starter/dev-data/products.json`, 'utf-8')
let products_object = JSON.parse(products);
products_object = products_object.map(el => Object.assign(el, { url: slugify(el.productName, { lower: true}) }));


// console.log(products_object);

const extractUrls = () => {
    let urls = [];
    products_object.forEach(product => {
        urls.push(product.url)
    });
    console.log(`urls = ${urls}`);
    return urls;
}

const products_urls = extractUrls();












// CREATE SERVER

const server = http.createServer((req, res) => {
    console.log('Server Created!');
    const { pathname } = url.parse(req.url, true);
    const parsed_url = url.parse(req.url, true);
    console.log(url.parse(req.url, true));
    
    

    //  OVERVIEW PAGE
    if (pathname == '/' || req.url == '/overview'){

        res.writeHead(
            statusCode = 200,
            headers = {
                'Content-type': 'text/html'
            }
        )

        const product_cards = products_object.map(el => replaceAllTemplates(template_card, el)).join('/n');
        overview_page = template_overview.replace('{%PRODUCT_CARDS%}', product_cards);
        // console.log(product_cards);
        
        res.end(overview_page);

    //  PRODUCT PAGE
    }
    else if (products_urls.includes(pathname.slice(1))){
        let display_product = 0;
        let product_url = pathname.slice(1);
        console.log(`url from pathname ${product_url}`);
        let output = 0;
        
        display_product = select_display_product(products_object, product_url)
        output = replaceAllTemplates(template_product, display_product)
        // console.log(display_product);
        
        res.writeHead(
           statusCode = 200,
            headers = {
            'Content-type': 'text/html'
            }
        )
            res.end(output);


        

    //  API PAGE
    }
    else if (pathname == '/api'){
        res.writeHead(
            statusCode = 200,
            headers = {
                'Content-type': 'application/json'
            }
        )

        res.end(products);
        
    //  NOT FOUND PAGE
    }
    else{
        res.writeHead(
            statusCode = 404,
            headers = {
                'Content-type': 'text/html'
            }
            );
        res.end('<h1>Page not found!</h1>');
    }
})


// START LISTENING TO SERVER

server.listen(1000, '127.0.0.1', () => {
    console.log('Server is now live and listening for requests')
})
