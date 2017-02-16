var http = require('http');
var fs = require('fs');
var PLANS_FILE = 'plans.csv';

var server = http.createServer(function(req, res) {

  fs.readFile('plans.csv', 'utf8', function(err, data) {
    if (err) {
      return callback(err);
    }

    var plans = [];
    var lines = data.split('\n');
    for (var i = 0; i < lines.length; i++) {
      console.log(lines[i]);
        var line = lines[i].split(',');
        plans.push({
            planName: line[0],
            planBenefits: line[1],
            group: line[2]
        });
    }

    console.log("Plans: ", plans);
    res.end(JSON.stringify(plans));
  });

});

server.listen(8000);
