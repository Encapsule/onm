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
        error: 'CIDS.setCID: Invalid request \'ref\' value type \'[object Undefined]\'. Expected \'[object Object]\'.'
    }
});

setCIDTestRunner({
    testName: "Specified request w/ref set to array",
    validConfig: false,
    request: { ref: [] },
    expectedResults: {
        error: 'CIDS.setCID: Invalid request \'ref\' value type \'[object Array]\'. Expected \'[object Object]\'.'
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
    validConfig: false,
    request: { ref: onm.Model, cname: 'Model' },
    expectedResults: {
        error: 'CIDS.setCID: Invalid request \'ref\' value type \'[object Function]\'. Expected \'[object Object]\'.'
    }
});

describe("Attempt to load the CoffeeScript-generated class 'TestClass2' module.", function() {
    var TestClass2 = null;
    before(function() {

        var moduleLoadWrapper = function() {
            TestClass2 = require('./test-use-case-cids-setCID-class');
        };
        assert.doesNotThrow(moduleLoadWrapper, "Test asset module failed to load.");

    });
    it("TestClass2 should be a defined, non-null, function.", function() {
        assert.isDefined(TestClass2);
        assert.isNotNull(TestClass2);
        assert.isFunction(TestClass2);
    });

    describe("Attempt to instantiate a new instance of 'TestClass2'.", function() {

        var testClass2 = null;

        before(function() {
            var createInstance = function() {
                testClass2 = new TestClass2();
            };
            assert.doesNotThrow(createInstance, "The 'TestClass2' constructor function is not expected to throw.");
        });

        it("We should not have a new instance of TestClass2.", function() {
            assert.isDefined(testClass2);
            assert.isNotNull(testClass2);
            assert.instanceOf(testClass2, TestClass2);
        });

        describe("Read the new instance's CNAME with CIDS.", function() {
            response = null;
            before(function() {
                assert.isDefined(testClass2);
                assert.isNotNull(testClass2);
                var getCNAMEWrapper = function() {
                    response = CIDS.getCNAME(testClass2);
                };
                assert.doesNotThrow(getCNAMEWrapper, "ONM OPERATIONS SHOULD NOT THROW!");
            });
            it("The calls to CIDS.getCNAME should have returned a response object.", function() {
                assert.isDefined(response);
                assert.isNotNull(response);
                assert.isObject(response);
            });
            it("There should not have been an error.", function() {
                assert.isNull(response.error);
            });
            it("The response result should match control value.", function() {
                var expectedJSON = '{"error":null,"result":{"cid":"onmbrsKOR0iv8kZXzhXejw","cname":"RAS","ref":{"__cid__":"onmbrsKOR0iv8kZXzhXejw"}}}';
                assert.equal(JSON.stringify(response), expectedJSON);
            });
        });

    });

});