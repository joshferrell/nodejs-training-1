var request = require('request');
var assert = require('assert');

request.get('http://localhost:8000', function(err, res, body) {
    assert.equal(res.statusCode, 200);
    assert.deepEqual(JSON.parse(body), [
      {"planName":"Great HMO","planBenefits":" benefits package 1","group":" UCD"},
      {"planName":"Silver PPO","planBenefits":" benefits package 2","group":" WHA"}
    ]);
});
