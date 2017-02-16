var http = require('http');

var server = http.createServer(function(req, res) {
  res.end(`
    <!doctype html>

    <head>
      <title>Plan App</title>
    </head>

    <body><h1>Hello, World</h1></body>
  `)
});

server.listen(8001);
