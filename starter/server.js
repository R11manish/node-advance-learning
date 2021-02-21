const  fs  = require('fs');
const http = require('http');
const url = require('url');


const replaceTemplate = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g , product.productName);
    output = output.replace(/{%IMAGE%}/g , product.image);
    output = output.replace(/{%PRICE%}/g , product.price);
    output = output.replace(/{%FROM%}/g , product.from);
    output = output.replace(/{%NUTRIENTS%}/g , product.nutrients);
    output = output.replace(/{%QUANTITY%}/g , product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g , product.description);
    output = output.replace(/{%ID%}/g , product.id);
    
    //checking for organic
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g , 'not-organic')
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req,res)=>{
    
    const {query , pathname} = url.parse(req.url , true)
    console.log(query.id)

    //pathName
    const urlPath = pathname
    //overview page

    if(urlPath === '/'  || urlPath ==='/overview'){
        res.writeHead(200,{'content-type' : 'text/html'});

        const cardHtml = dataObject.map(el => replaceTemplate(tempCard ,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
        res.end(output);
    } 
    //product page
    else if(urlPath ==='/product'){
        res.writeHead(200,{'content-type' : 'text/html'});
        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct , product)
        res.end(output)
    }
    
    
    else  if(urlPath === '/exit'){
        res.end('Hopes that you will come back to us .it been amazing journey withg uh all');

    }
    //API
    else if(urlPath === '/api') {
        res.writeHead(200 , {
            'content-type' : 'application/json'
        });
        res.end(data);
    } 

    //not found 
     else {
        res.writeHead(404,{
            'content-type' : 'text/html',
            'security-level' :'very-very-high'
        })
        res.end('<h1>page not found!!</h1>')
    }
})


server.listen(8000, '127.0.0.1' , ()=>{
    console.log('listening the responses on port 8000');
});