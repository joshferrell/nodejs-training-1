// 1. Run this script
// 2. Change this script so that plans object contains the expected value

var fs = require('fs');
var assert = require('assert');
var plans = [];

fs.readFile('plans.csv', 'utf8', function(err, data) {
  var lines = data.split('\n');
  for (var i = 0; i < lines.length; i++) {
      var line = lines[i].split(',');
      plans.push({
          planName: line[0],
          planBenefits: line[1],
          group: line[2]
      });
  }

  console.log("After file read plans: ", plans);
  assert.deepEqual(plans,
      [{
          planName: 'Great HMO',
          planBenefits: ' benefits package 1',
          group: ' UCD'
      },
      {
          planName: 'Silver PPO',
          planBenefits: ' benefits package 2',
          group: ' WHA'
      }]
  );
});

console.log("Sync Plans: ", plans);
