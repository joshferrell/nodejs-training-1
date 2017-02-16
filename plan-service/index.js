// 1. Run this script
// 2. Change this script so that plans object contains the expected value

var fs = require('fs');
var assert = require('assert');

var f = fs.readFileSync('plans.csv', 'utf8');

console.log(f);

var plans = [];
var lines = f.split('\n');

for (var i = 0; i < lines.length; i++) {
}

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
