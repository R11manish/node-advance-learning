const  fs  = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req,res)=>{
    const urlPath = req.url;
    console.log(urlPath);
    if(urlPath === '/'  || urlPath ==='/overview'){
        res.end('hey whatsup buddy finally we founded that been amzing journey');
    } else  if(urlPath === '/exit'){
        res.end('Hopes that you will come back to us .it been amazing journey withg uh all');
    } else if(urlPath === '/api') {
        res.writeHead(200 , {
            'content-type' : 'application/json'
        });
        res.end(data);
    } 
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