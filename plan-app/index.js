var Express = require( "express" )
var Request = require('request');

var PlanPage = require( "./PlanPage" )

var app = Express()

app.get( "/", function( req, res ) {
  Request.get('http://localhost:8000', function(err, planServiceResponse, body) {
    res.end(PlanPage.render(JSON.parse(body)) )
  } );
} )

app.listen(8001);
