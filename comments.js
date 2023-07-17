//Create web server steps
//1. create a server
//2. start the server
//3. listen for requests
//4. respond to requests

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((request, response) => {
    //console.log('request', request.url);
    const path = request.url;
    const method = request.method;
    console.log('method', method);

    if (path === '/') {
        response.write('<html>');
        response.write('<head><title>Enter Message</title></head>');
        response.write('<body><form action ="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        response.write('</html>');
        return response.end();
    }

    if (path === '/message' && method === 'POST') {
        //console.log('post request');
        const body = [];
        request.on('data', (chunk) => {
            console.log('chunk', chunk);
            body.push(chunk);
        });

        request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('parsedBody', parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });

        response.statusCode = 302;
        response.setHeader('Location', '/');
        return response.end();
    }

    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>My first page</title></head>');
    response.write('<body><h1>Hello from my node.js server!</h1></body>');
    response.write('</html>');
    response.end();
});

server.listen(3000);

 