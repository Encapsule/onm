// test-use-case-cids-setCID.js

var assert = require('chai').assert;

var dirRequires = require('./dir-requires');
var CIDS = dirRequires.CIDS;

var setCIDTestRunner = require('./test-runner-cids-setCID');


setCIDTestRunner({
    testName: "Missing request object",
    validConfig: false,
    expectedResults: {
        error: '',
        json: ''
    }
});

setCIDTestRunner({
    testName: "Specified non-object as request",
    validConfig: false,
    request: [],
    expectedResults: {
        error: '',
        json: ''
    }
});



