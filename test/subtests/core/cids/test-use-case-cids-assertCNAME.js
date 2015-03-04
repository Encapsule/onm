// test-use-case-cids-assertCNAME.js
//

var assert = require('chai').assert

var dirRequires = require('./dir-requires');
var onm = dirRequires.onm;
var CIDS = dirRequires.CIDS;
var assertCNAMETestRunner = require('./test-runner-cids-assertCNAME');

assertCNAMETestRunner({
    testName: "Missing request object",
    validConfig: false,
    expectedResults: {
        error: ''
    }
});

