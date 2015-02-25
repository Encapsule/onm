// test-use-case-core-bad-requests.js

var onmcore = require('../../../lib/core/onm-core');
var testOnmCoreRequest = require('./test-runner-core-request');




testOnmCoreRequest({
    testName: "first core request",
    validConfig: false,
    request: undefined,
    expectedResults: {
        error: 'onm.request failed: Missing required request object in-parameter.'
    }
});

testOnmCoreRequest({
    testName: "whatever",
    validConfig: false,
    request: {
        inputs: [ onmcore.wrapDAB("whatever").result ],
        outputType: "DOA"
    },
    expectedResults: {
        error: 'onm.request failed: Invalid request object \'outputType\' value \'DOA\' is invalid.'
    }
});

