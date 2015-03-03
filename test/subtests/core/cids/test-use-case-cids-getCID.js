// test-use-case-cids-setCID.js

var assert = require('chai').assert;

var dirRequires = require('./dir-requires');
assert.isDefined(dirRequires);
assert.property(dirRequires,'CIDS');
assert.property(dirRequires,'CIDS_TABLE');

var CIDS = dirRequires.CIDS;
var CIDS_TABLE = dirRequires.CIDS_TABLE;
assert.isDefined(CIDS);
assert.isDefined(CIDS_TABLE);

var getCIDTestRunner = require('./test-runner-cids-getCID');


getCIDTestRunner({
    testName: "Missing request object",
    validConfig: false,
    expectedResults: {
        error: '',
        json: ''
    }
});

getCIDTestRunner({
    testName: "Specifiy non-object as request",
    validConfig: false,
    ref: [],
    expectedResults: {
        error: '',
        json: ''
    }
});

getCIDTestRunner({
    testName: "Specifiy empty JavaScript object as request",
    validConfig: false,
    ref: {},
    expectedResults: {
        error: '',
        json: ''
    }
});

getCIDTestRunner({
    testName: "Specifiy empty JavaScript object as request",
    validConfig: false,
    ref: {},
    expectedResults: {
        error: '',
        json: ''
    }
});

var testObject1 = {};
testObject1[CIDS_TABLE.reservedPropertyName] = "meow";

getCIDTestRunner({
    testName: "Specifiy empty JavaScript object with bogus IRUT string 'meow'.",
    validConfig: false,
    ref: testObject1,
    expectedResults: {
        error: '',
        json: ''
    }
});

var testObject2 = {};
testObject2[CIDS_TABLE.reservedPropertyName] = '0123456789012345678901'

getCIDTestRunner({
    testName: "Specifiy empty JavaScript object with bogus IRUT string '0123456789012345678901'.",
    validConfig: false,
    ref: testObject2,
    expectedResults: {
        error: '',
        json: ''
    }
});


