// test-use-case-cids-getCNAME.js

var assert = require('chai').assert;

var dirRequires = require('./dir-requires');
assert.isDefined(dirRequires);
assert.property(dirRequires,'CIDS');
assert.property(dirRequires,'CIDS_TABLE');

var CIDS = dirRequires.CIDS;
var CIDS_TABLE = dirRequires.CIDS_TABLE;
assert.isDefined(CIDS);
assert.isDefined(CIDS_TABLE);

var getCNAMETestRunner = require('./test-runner-cids-getCNAME');


getCNAMETestRunner({
    testName: "Missing request object",
    validConfig: false,
    expectedResults: {
        error: 'CIDS.getCID: Invalid request \'object\' value type \'[object Undefined]\'. Expected reference to \'[object Object]\'.'
    }
});

getCNAMETestRunner({
    testName: "Specifiy non-object as request",
    validConfig: false,
    ref: [],
    expectedResults: {
        error: 'CIDS.getCID: Invalid request \'object\' value type \'[object Array]\'. Expected reference to \'[object Object]\'.'
    }
});

getCNAMETestRunner({
    testName: "Specifiy empty JavaScript object as request",
    validConfig: false,
    ref: {},
    expectedResults: {
        error: 'CIDS.getCID: Object appears not to be CID-identified.'
    }
});

getCNAMETestRunner({
    testName: "Specifiy empty JavaScript object as request",
    validConfig: false,
    ref: {},
    expectedResults: {
        error: 'CIDS.getCID: Object appears not to be CID-identified.'
    }
});

var testObject1 = {};
testObject1[CIDS_TABLE.reservedPropertyName] = "meow";

getCNAMETestRunner({
    testName: "Specifiy empty JavaScript object with bogus IRUT string 'meow'.",
    validConfig: false,
    ref: testObject1,
    expectedResults: {
        error: 'CIDS.getCID: Object appears to be CID-identified with an unknown, non-IRUT, string format.'
    }
});

var testObject2 = {};
testObject2[CIDS_TABLE.reservedPropertyName] = '0123456789012345678901'

getCNAMETestRunner({
    testName: "Specifiy empty JavaScript object with bogus IRUT string '0123456789012345678901'.",
    validConfig: false,
    ref: testObject2,
    expectedResults: {
        error: 'CIDS.getCID: Object is identified with an unknown CID value \'0123456789012345678901\'.'
    }
});


var testObject3 = {};
testObject3[CIDS_TABLE.reservedPropertyName] = 'onmP7n5uTxaLduPZF_Naig';

getCNAMETestRunner({
    testName: "Specifiy empty JavaScript object with bogus IRUT string '0123456789012345678901'.",
    validConfig: true,
    ref: testObject3,
    expectedResults: {
        json: '{"cid":"onmP7n5uTxaLduPZF_Naig","cname":"DAO","ref":{"__cid__":"onmP7n5uTxaLduPZF_Naig"}}'
    }
});


