// test-use-case-core-wrap-pods.js

var assert = require('chai').assert;
var onmcore = require('../../../../lib/core/pods/pods');

/*
  vector = {
      testName: string
      validConfig: boolean
      method: string method name to call on onm core
      podref: reference to pod to wrap
      expectedResults: {
          error: string
          json: string
      }
  }
*/

var testCorePodWrapper = function (vector_) {
    describe("onm core pod wrapper test runner: " + vector_.testName, function() {
        response = null;
        before(function() {
            var requestRunner = function() {
                response = onmcore[vector_.method](vector_.podref);
            };
            assert.doesNotThrow(requestRunner, "Call to onm." + vector_.method + " should not throw.");
        });
        it("The request should have returned a response.", function() {
            assert.isDefined(response);
            assert.isNotNull(response);
        });
        it("The response should be an object.", function() {
            assert.isObject(response);
        });
        it("The response should export property 'error'.", function() {
            assert.property(response, 'error');
        });
        it("The response should export property 'result'.", function() {
            assert.property(response, 'result');
        });
        if (vector_.validConfig) {
            it("The request is expected to have succeeded.", function() {
                assert.isNull(response.error);
                assert.isNotNull(response.result);
            });
            it("The JSON serialization of the response result should match expected control value.", function() {
                assert.equal(JSON.stringify(response.result), vector_.expectedResults.json);
            });
        } else {
            it("The request is expected to have failed.", function() {
                assert.isNotNull(response.error);
                assert.isNull(response.result);
            });
            it("The response error should match the expected control value.", function() {
                assert.equal(response.error, vector_.expectedResults.error);
            });
        }
    });
};

// VALID POD WRAPS

testCorePodWrapper({
    testName: "Wrap a valid JavaScript object in a DATA wrapper.",
    validConfig: true,
    method: 'wrapDATA',
    podref: { testProperty: "this is a test property" },
    expectedResults: {
        error: null,
        json: ''
    }
});

testCorePodWrapper({
    testName: "Wrap a valid JavaScript string in a DAB wrapper.",
    validConfig: true,
    method: 'wrapDAB',
    podref: "This is not a valid DAB-format JSON string. But any string is fine as far as a DAB wrapper is concerned.",
    expectedResults: {
        error: null,
        json: ''
    }
});

testCorePodWrapper({
    testName: "Wrap a valid JavaScript string in a JSON wrapper.",
    validConfig: true,
    method: 'wrapJSON',
    podref: '{ "testProperty": "this is a test property." }',
    expectedResults: {
        error: null,
        json: ''
    }
});

testCorePodWrapper({
    testName: "Wrap a valid JavaScript string in a RIS wrapper.",
    validConfig: true,
    method: 'wrapRIS',
    podref: "matrixcorp.employees.joesmith.hr.infractions.internet.blockedSites.2015",
    expectedResults: {
        error: null,
        json: ''
    }
});


// INVALID POD WRAPS

testCorePodWrapper({
    testName: "Attempt to wrap an array in a DATA wrapper.",
    validConfig: false,
    method: 'wrapDATA',
    podref: [ "these are not the droids you're looking for." ],
    expectedResults: {
        error: '',
        json: ''
    }
});

testCorePodWrapper({
    testName: "Wrap a valid JavaScript string in a DAB wrapper.",
    validConfig: false,
    method: 'wrapDAB',
    podref: [ "these are not the droids you're looking for." ],
    expectedResults: {
        error: '',
        json: ''
    }
});

testCorePodWrapper({
    testName: "Wrap a valid JavaScript string in a JSON wrapper.",
    validConfig: false,
    method: 'wrapJSON',
    podref: [ "these are not the droids you're looking for." ],
    expectedResults: {
        error: '',
        json: ''
    }
});

testCorePodWrapper({
    testName: "Wrap a valid JavaScript string in a RIS wrapper.",
    validConfig: false,
    method: 'wrapRIS',
    podref: [ "these are not the droids you're looking for." ],
    expectedResults: {
        error: '',
        json: ''
    }
});


