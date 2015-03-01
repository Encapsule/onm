// test-use-case-ntcl-cluts.js

var assert = require('chai').assert;

/*
  test = {
      cluts: CLUTS module export object
      testName: string
      validConfig: boolean
      request: {
          uMoniker: string
          vMoniker: string
          value: JavaScript refernence to valUE
      },
      expectedResults: {
          error: string
          result: string, number, or undefined?
      }
  }
*/
var testCLUTS = function(test_) {
    describe("NTCL.CLUTS test use case: " + test_.testName, function() {
        response = null;
        before(function() {
            var testFunctionWrapper = function() {
                response = test_.cluts.request(test_.request);
            };
            assert.doesNotThrow(testFunctionWrapper, "CLUTS.request should never throw.");
        });
        it("CLUTS.request should have returned a response of type object.", function() {
            assert.isDefined(response);
            assert.isNotNull(response);
            assert.isObject(response);
        });
        if (test_.validConfig) {
            it("The request is expected to have succeeded.", function() {
                assert.isNull(response.error);
                assert.isDefined(response.result);
                assert.isNotNull(response.result);
            });
            it("The response result should match the expected test control value.", function() {
                assert.equal(response.result, test_.expectedResults.result);
            });
        } else {
            it("The request is expected to have failed.",  function() {
                assert.isDefined(response.error);
                assert.isNotNull(response.error);
                assert.isString(response.error);
                assert.isUndefined(response.result);
            });
            it("The response error should match the expected test control value.", function() {
                assert.equal(response.error, test_.expectedResults.error);
            });
        }
    });
}

CLUTS = require('../../../../lib/core/ntcl/ntcl-cluts');

testCLUTS({
    cluts: CLUTS,
    testName: "Missing request object",
    validConfig: false,
    request: undefined,
    expectedResults: {
        error: 'CLUTS.request failed: Missing request object.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Null request object",
    validConfig: false,
    request: null,
    expectedResults: {
        error: 'CLUTS.request failed: Missing request object.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object type",
    validConfig: false,
    request: [],
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request value type. Expected reference to \'[object Object]\'.',
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: missing 'uMoniker'",
    validConfig: false,
    request: {},
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'uMoniker\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'uMoniker' is null",
    validConfig: false,
    request: {
        uMoniker: null
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'uMoniker\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'uMoniker' is undefined",
    validConfig: false,
    request: {
        uMoniker: undefined
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'uMoniker\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'uMoniker' is not a string",
    validConfig: false,
    request: {
        uMoniker: 6
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request \'uMoniker\' value type. Expected reference to \'[object String]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Missing 'vMoniker'",
    validConfig: false,
    request: {
        uMoniker: "jsReference"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'vMoniker\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'vMoniker' is null",
    validConfig: false,
    request: {
        uMoniker: "jsReference",
        vMoniker: null
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'vMoniker\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'vMoniker' is undefined",
    validConfig: false,
    request: {
        uMoniker: "jsReference",
        vMoniker: undefined
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'vMoniker\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'vMoniker' is not a string",
    validConfig: false,
    request: {
        uMoniker: "jsReference",
        vMoniker: { test: "YO!" }
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request \'vMoniker\' value type. Expected reference to \'[object String]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Invalid 'uMoniker' string",
    validConfig: false,
    request: {
        uMoniker: "ERROR",
        vMoniker: "jsReference"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Attempting conversion from \'ERROR\' to \'jsReference\': Invalid request \'uMoniker\' value \'ERROR\' is not a recognized onm type alias string.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Unity conversion doesn't make sense",
    validConfig: false,
    request: {
        uMoniker: "whatever",
        vMoniker: "whatever"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Conversion request to convert \'whatever\' to reference of itself is invalid.'
    }
});


testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion from 'jsCode' with invalid value type.",
    validConfig: false,
    request: {
        uMoniker: "jsCode",
        vMoniker: "jsMoniker",
        value: "should be a number"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Attempting conversion from \'jsCode\' to \'jsMoniker\': Invalid request \'value\' type. Expected reference to \'[object Number]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion from 'jsCode' with numerical value out-of-range.",
    validConfig: false,
    request: {
        uMoniker: "jsCode",
        vMoniker: "jsMoniker",
        value: 100
    },
    expectedResults: {
        error: ''
    }
});

