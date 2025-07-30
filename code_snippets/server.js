const http = require("node:http");


const server = http.createServer(function(req, res) {
    if(req.url === "/getSecretData") {
        res.end("No secrets for you bro");
    }
    res.end("Hello World");
});

server.listen(3000);