
const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceAllTemplates = require(`${__dirname}/modules/replace_all_template.js`);
const select_display_product = require(`${__dirname}/modules/select_display_product.js`);


const template_overview = fs.readFileSync(`${__dirname}/complete-node-bootcamp/node-farm/starter/templates/template_overview.html`, 'utf-8')
const template_product = fs.readFileSync(`${__dirname}/complete-node-bootcamp/node-farm/starter/templates/template_product.html`, 'utf-8')
const template_card = fs.readFileSync(`${__dirname}/complete-node-bootcamp/node-farm/starter/templates/template_card.html`, 'utf-8')

const products = fs.readFileSync(`${__dirname}/complete-node-bootcamp/node-farm/starter/dev-data/products.json`, 'utf-8')
const products_object = JSON.parse(products);








// CREATE SERVER

const server = http.createServer((req, res) => {
    console.log('Server Created!');
    const { query, pathname } = url.parse(req.url, true);
    const parsed_url = url.parse(req.url, true);
    
    

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
        console.log(product_cards);
        
        res.end(overview_page);

    //  PRODUCT PAGE
    }
    else if (pathname == '/product'){
        let display_product = 0;
        let output = 0;
        
        if (query.id != undefined) {
            display_product = select_display_product(products_object, query.id)
            output = replaceAllTemplates(template_product, display_product)
            console.log(display_product);

            res.writeHead(
               statusCode = 200,
                headers = {
                'Content-type': 'text/html'
                }
            )
            res.end(output);
        }else{
            res.writeHead(
                statusCode = 404,
                headers = {
                    'Content-type': 'text/html'
                }
                );
            res.end('<h1>Page not found!</h1>');
        }


        

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
