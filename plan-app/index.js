var http = require('http');

var renderPlan = function( plan ) {
  return `<li>${ plan.planName }</li>`
}

var server = http.createServer(function(req, res) {

  var plans = [
    {"planName":"Great HMO","planBenefits":"benefits package 1","group":"UCD"},
    {"planName":"Silver PPO","planBenefits":"benefits package 2","group":"WHA"}
  ]

  res.end(`
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

server.listen(8001);
