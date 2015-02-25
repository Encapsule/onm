// test-use-case-core-bad-requests.js

var onmcore = require('../../../lib/core/onm-core');
var testOnmCoreRequest = require('./test-runner-core-request');




testOnmCoreRequest({
    testName: "bad request: undefined request object",
    validConfig: false,
    request: undefined,
    expectedResults: {
        error: 'onm.request failed: Missing required request object in-parameter.'
    }
});

testOnmCoreRequest({
    testName: "bad request: null request request object",
    validConfig: true,
    request: null,
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: string instead of request object",
    validConfig: true,
    request: "whoops",
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: array instead of request object",
    validConfig: true,
    request: [],
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object with no properties",
    validConfig: true,
    request: {},
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'inputs' set to undefined",
    validConfig: true,
    request: { inputs: undefined },
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'inputs' set to null",
    validConfig: true,
    request: { inputs: null },
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'inputs' set to non-array (object)",
    validConfig: true,
    request: { inputs: {} },
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'inputs' set to empty array / 'outputType' undefined",
    validConfig: true,
    request: { inputs: [] },
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' set to null",
    validConfig: true,
    request: { inputs: [], outputType: null },
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' set to non-string (array)",
    validConfig: true,
    request: { inputs: [], outputType: [] },
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' value set to unknown classname",
    validConfig: true,
    request: { inputs: [], outputType: "Hey, man. Like, how's it going. And, shit." },
    expectedResults: {
        error: ''
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' value set to known classname/but no input so no operation",
    validConfig: true,
    request: { inputs: [], outputType: "JSON" },
    expectedResults: {
        error: ''
    }
});



