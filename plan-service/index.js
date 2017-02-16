var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {

  fs.readFile('plans.csv', 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }

    var plans = data
      .split("\n")
      .map(l => l.split(","))
      .map(l => ({ planName: l[0], planBenefits: l[1], group: l[2] }) )

    res.end(JSON.stringify(plans));
  });

});

server.listen(8000);
