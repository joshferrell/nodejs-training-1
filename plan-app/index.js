var Express = require( "express" )
var Request = require('request');

var app = Express()

var renderPage = function( plans ) {
  return `<!doctype html>

    <head>
      <title>Plan App</title>
    </head>

    <body>
      <h1>Hello, World</h1>
      <ul>${ plans.map( renderPlan ).join("") }</ul>
    </body>
  `
}

var renderPlan = function( plan ) {
  return `<li>${ plan.planName }</li>`
}

app.get( "/", function( req, res ) {
  Request.get('http://localhost:8000', function(err, planServiceResponse, body) {
    res.end(renderPage(JSON.parse(body)))
  });
} )

app.listen(8001);
