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
        error: 'CIDS.assertCNAME: Missing request object in-parameter.'
    }
});

// We don't bother with the full matrix of bad inputs here because CIDS.assertCNAME
// shares a common request normalization path w/CIDS.setCID.

assertCNAMETestRunner({
    testName: "CNAME assertion on non-CIDS-identified object",
    validConfig: false,
    request: {
        ref: {},
        cname: 'DOA'
    },
    expectedResults: {
        error: 'CIDS.assertCNAME: CIDS.getCNAME: Object appears not to be CID-identified.'
    }
});

assertCNAMETestRunner({
    testName: "CNAME assertion on CIDS-identified object but with a corrupt CID and valid CNAME",
    validConfig: false,
    request: {
        ref: { __cid__: 'onmP7n5uTxaLduPZF_Nai*' },
        cname: 'DAO'
    },
    expectedResults: {
        error: 'CIDS.assertCNAME: CIDS.getCNAME: Object is identified with an unknown CID value \'onmP7n5uTxaLduPZF_Nai*\'.'
    }
});

assertCNAMETestRunner({
    testName: "CNAME assertion on CIDS-identified object but with valid CID but invalid CNAME",
    validConfig: false,
    request: {
        ref: { __cid__: 'onmP7n5uTxaLduPZF_Naig' },
        cname: 'the cat believes it is necessary to sit atop the keyboard.'
    },
    expectedResults: {
        error: 'CIDS.assertCNAME: Invalid request \'cname\' value \'the cat believes it is necessary to sit atop the keyboard.\'. Registered in CIDS: [IRUT,Model,Address,Store,Namespace,NSD,ASM,RAS,DAO,RAL,RLP,RIS,DAB,JSON,DATA].'
    }
});

assertCNAMETestRunner({
    testName: "CNAME assertion on CIDS-identified object valid CID, valid CNAME, but not the same resource type (i.e. bad assert).",
    validConfig: false,
    request: {
        ref: { __cid__: 'onmP7n5uTxaLduPZF_Naig' },
        cname: 'IRUT'
    },
    expectedResults: {
        error: 'CIDS.assertCNAME: Target asserted to be a \'IRUT\' is actually a \'DAO\' resource.'
    }
});

assertCNAMETestRunner({
    testName: "CNAME assertion on CIDS-identified object valid CID, valid CNAME, GOOD ASSERT.",
    validConfig: true,
    request: {
        ref: { __cid__: 'onmP7n5uTxaLduPZF_Naig' },
        cname: 'DAO'
    },
    expectedResults: {
        json: '{"cid":"onmP7n5uTxaLduPZF_Naig","cname":"DAO","ref":{"__cid__":"onmP7n5uTxaLduPZF_Naig"}}'
    }
});

