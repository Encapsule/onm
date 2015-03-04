// test-use-case-cids-setCID.js

var assert = require('chai').assert;

var dirRequires = require('./dir-requires');
var onm = dirRequires.onm;
var CIDS = dirRequires.CIDS;
var setCIDTestRunner = require('./test-runner-cids-setCID');


setCIDTestRunner({
    testName: "Missing request object",
    validConfig: false,
    expectedResults: {
        error: 'CIDS.setCID: Missing request object in-parameter.'
    }
});

setCIDTestRunner({
    testName: "Specified array as request",
    validConfig: false,
    request: [],
    expectedResults: {
        error: 'CIDS.setCID: Invalid \'request\' type \'[object Array]\'. Expected \'[object Object]\'.'
    }
});

setCIDTestRunner({
    testName: "Specified empty object as request",
    validConfig: false,
    request: {},
    expectedResults: {
        error: 'CIDS.setCID: Invalid request \'ref\' value type \'[object Undefined]\'. Expected \'[object Object]\' or \'[object Function]\'.'
    }
});

setCIDTestRunner({
    testName: "Specified request w/ref set to array",
    validConfig: false,
    request: { ref: [] },
    expectedResults: {
        error: 'CIDS.setCID: Invalid request \'ref\' value type \'[object Array]\'. Expected \'[object Object]\' or \'[object Function]\'.'
    }
});

setCIDTestRunner({
    testName: "Specified request w/ref set to empty object but missing cname",
    validConfig: false,
    request: { ref: {} },
    expectedResults: {
        error: 'CIDS.setCID: Invalid request \'cname\' value type \'[object Undefined]\'. Expected \'[object String].'
    }
});

setCIDTestRunner({
    testName: "Specified request w/ref set to empty object w/cname set to array",
    validConfig: false,
    request: { ref: {}, cname: [] },
    expectedResults: {
        error: 'CIDS.setCID: Invalid request \'cname\' value type \'[object Array]\'. Expected \'[object String].'
    }
});

setCIDTestRunner({
    testName: "Specified request w/ref set to empty object w/cname set to a bogus name",
    validConfig: false,
    request: { ref: {}, cname: 'bogus' },
    expectedResults: {
        error: 'CIDS.setCID: Unknown object class name \'bogus\'. Registered in CIDS: [IRUT,Model,Address,Store,Namespace,NSD,ASM,RAS,DAO,RAL,RLP,RIS,DAB,JSON,DATA].'
    }
});

setCIDTestRunner({
    testName: "Specified request w/ref set to empty object w/cname set to 'DOA'",
    validConfig: true,
    request: { ref: {}, cname: 'DAO' },
    expectedResults: {
        json: '{"cid":"onmP7n5uTxaLduPZF_Naig","cname":"DAO","ref":{"__cid__":"onmP7n5uTxaLduPZF_Naig"}}'
    }
});

setCIDTestRunner({
    testName: "Specified request w/ref set to onm.Model constructor and cname 'Model'",
    validConfig: true,
    request: { ref: onm.Model, cname: 'Model' },
    expectedResults: {
        json: '{"cid":"onmnqPaPSWKDsC9c8GZaEg","cname":"Model"}' // Note that we do not get ref in the JSON because it's a function
    }
});




