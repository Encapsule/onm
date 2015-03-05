// test-use-case-core-bad-requests.js

var testOnmCoreRequest = require('./test-runner-crp-request');

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
    validConfig: false,
    request: null,
    expectedResults: {
        error: 'onm.request failed: Missing required request object in-parameter.'
    }
});

testOnmCoreRequest({
    testName: "bad request: string instead of request object",
    validConfig: false,
    request: "whoops",
    expectedResults: {
        error: 'onm.request failed: Invalid request object type. Expected reference to \'[object Object]\'.'
    }
});

testOnmCoreRequest({
    testName: "bad request: array instead of request object",
    validConfig: false,
    request: [],
    expectedResults: {
        error: 'onm.request failed: Invalid request object type. Expected reference to \'[object Object]\'.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object with no properties",
    validConfig: false,
    request: {},
    expectedResults: {
        error: 'onm.request failed: Invalid request missing \'verb\' property.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'verb' set to undefined",
    validConfig: false,
    request: { verb: undefined },
    expectedResults: {
        error: 'onm.request failed: Invalid request missing \'verb\' property.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'verb' set to null",
    validConfig: false,
    request: { verb: null },
    expectedResults: {
        error: 'onm.request failed: Invalid request missing \'verb\' property.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'verb' set to undefined",
    validConfig: false,
    request: { verb: undefined },
    expectedResults: {
        error: 'onm.request failed: Invalid request missing \'verb\' property.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'verb' set to array",
    validConfig: false,
    request: { verb: [] },
    expectedResults: {
        error: 'onm.request failed: Invalid request \'verb\' value type. Expected \'[object String]\'.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'verb' set to string/missing outputType",
    validConfig: false,
    request: { verb: "test" },
    expectedResults: {
        error: 'onm.request failed: Invalid request object missing \'outputType\' property.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' set to null",
    validConfig: false,
    request: { verb: "test", outputType: null },
    expectedResults: {
        error: 'onm.request failed: Invalid request object missing \'outputType\' property.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' set to undefined",
    validConfig: false,
    request: { verb: "test", outputType: undefined },
    expectedResults: {
        error: 'onm.request failed: Invalid request object missing \'outputType\' property.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' set to non-string (array)",
    validConfig: false,
    request: { verb: "test", outputType: [] },
    expectedResults: {
        error: 'onm.request failed: Invalid request object \'outputType\' value type. Expected \'[object String]\'.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' value set to bogus classname",
    validConfig: false,
    request: { verb: "test", outputType: "Hey, man. Like, how's it going. And, shit." },
    expectedResults: {
        error: 'onm.request failed: Invalid request object \'outputType\' value \'Hey, man. Like, how\'s it going. And, shit.\' is invalid.'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'outputType' value set to known classname/but no inputs so no operation",
    validConfig: false,
    request: { verb: "test", outputType: "JSON" },
    expectedResults: {
        error: 'onm.request failed: No operation for request signature \'onm-crp::(JSON)<==(test)==<(~)\'. Not the droids we\'re looking for...'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'inputs' set to null",
    validConfig: false,
    request: { verb: "test", outputType: "JSON", inputs: null },
    expectedResults: {
        error: 'onm.request failed: No operation for request signature \'onm-crp::(JSON)<==(test)==<(~)\'. Not the droids we\'re looking for...'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'inputs' set to undefined",
    validConfig: false,
    request: { verb: "test", outputType: "JSON", inputs: undefined },
    expectedResults: {
        error: 'onm.request failed: No operation for request signature \'onm-crp::(JSON)<==(test)==<(~)\'. Not the droids we\'re looking for...'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object 'inputs' set to non-array (object)",
    validConfig: false,
    request: { verb: "test", outputType: "JSON", inputs: {} },
    expectedResults: {
        error: 'onm.request failed: Invalid request object \'inputs\' value type. Expected reference to \'[object Array]].'
    }
});

testOnmCoreRequest({
    testName: "bad request: request object verb valid / input valid / missing outputType",
    validConfig: false,
    request: { verb: "test", inputs: [] },
    expectedResults: {
        error: 'onm.request failed: Invalid request object missing \'outputType\' property.'
    }
});


testOnmCoreRequest({
    testName: "bad request: request object input valid / output valid / missing verb",
    validConfig: false,
    request: { inputs: [], outputType: "JSON" },
    expectedResults: {
        error: 'onm.request failed: Invalid request missing \'verb\' property.'
    }
});



