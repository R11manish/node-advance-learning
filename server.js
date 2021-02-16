const http = require('http');
const url = require('url');

const server = http.createServer((req,res)=>{
    const urlPath = req.url;
    console.log(urlPath);
    if(urlPath === '/'  || urlPath ==='/overview'){
        res.end('hey whatsup buddy finally we founded that been amzing journey');
    } else  if(urlPath === '/exit'){
        res.end('Hopes that you will come back to us .it been amazing journey withg uh all');
    } else {
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