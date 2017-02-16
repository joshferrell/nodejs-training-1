var http = require('http');
var request = require('request');

var renderPlan = function( plan ) {
  return `<li>${ plan.planName }</li>`
}

var server = http.createServer(function(req, response) {

  request.get('http://localhost:8000', function(err, planServiceResponse, body) {
    var plans = JSON.parse(body)

    response.end(`
      <!doctype html>

      <head>
        <title>Plan App</title>
      </head>

      <body>
        <h1>Hello, World</h1>
        <ul>${ plans.map( renderPlan ).join("") }</ul>
      </body>
    `)
  });

});

server.listen(8001);
