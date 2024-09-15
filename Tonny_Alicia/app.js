const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

    if(req.url === '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if (req.url === '/api') {
        res.writeHead(200, { 'content-type' : 'text/json'});
        const json = {
            name: "Debjani"
        }
        res.end(JSON.stringify(json));
    } else {
        res.writeHead(400, { 'content-type' : 'text/text'});
        res.end("File not found")
    }
    
}).listen(3000, '127.0.0.1', () => {
    console.log("server is running");
});