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
                assert.isNull(response.result);
            });
            it("The response error should match the expected test control value.", function() {
                assert.equal(response.error, test_.expectedResults.error);
            });
        }
    });
}

CLUTS = require('../../../lib/ntcl-cluts');

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
        error: 'CLUTS.request failed: Invalid request value type. Expected reference to \'[object Object]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: missing 'from'",
    validConfig: false,
    request: {},
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'from\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'from' is null",
    validConfig: false,
    request: {
        from: null
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'from\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'from' is undefined",
    validConfig: false,
    request: {
        from: undefined
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'from\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'from' is not a string",
    validConfig: false,
    request: {
        from: 6
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request \'from\' value type. Expected reference to \'[object String]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Missing 'to'",
    validConfig: false,
    request: {
        from: "jsObject"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'to\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'to' is null",
    validConfig: false,
    request: {
        from: "jsObject",
        to: null
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'to\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'to' is undefined",
    validConfig: false,
    request: {
        from: "jsObject",
        to: undefined
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request missing \'to\' property.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: 'to' is not a string",
    validConfig: false,
    request: {
        from: "jsObject",
        to: { test: "YO!" }
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request \'to\' value type. Expected reference to \'[object String]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Invalid 'from' string",
    validConfig: false,
    request: {
        from: "ERROR",
        to: "jsCode"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid \'ERROR\' to \'jsCode\' conversion request. Invalid request \'from\' value \'ERROR\' is not a valid dimension string. Valid dimensions: [jsReference,jsCode,jsTypeString,jsMoniker,jsonMoniker].'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Unity conversion doesn't make sense",
    validConfig: false,
    request: {
        from: "whatever",
        to: "whatever",
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid \'whatever\' to \'whatever\' conversion request. Invalid request \'from\' value \'whatever\' is not a valid dimension string. Valid dimensions: [jsReference,jsCode,jsTypeString,jsMoniker,jsonMoniker].'
    }
});


testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion from 'jsCode' with invalid value type.",
    validConfig: false,
    request: {
        from: "jsCode",
        to: "jsMoniker",
        value: "should be a number"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid \'jsCode\' to \'jsMoniker\' conversion request. Invalid request \'value\' type. Expected reference to \'[object Number]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion from 'jsCode' with numerical value out-of-range.",
    validConfig: false,
    request: {
        from: "jsCode",
        to: "jsMoniker",
        value: 100
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid \'jsCode\' to \'jsMoniker\' conversion request. Invalid request \'value\' \'100\' is not a valid \'jsCode\' value.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion of 'jsMoniker' to 'jsCode' w/'value' set to non-string.",
    validConfig: false,
    request: {
        from: "jsMoniker",
        to: "jsCode",
        value: 100
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid \'jsMoniker\' to \'jsCode\' conversion request. Invalid request \'value\' type. Expected reference to \'[object String]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion of 'jsMoniker' to 'WTF_THIS'.",
    validConfig: false,
    request: {
        from: "jsMoniker",
        to: "WTF-THIS",
        value: "jsBoolean"
    },
    expectedResults: {
        error: 'CLUTS.request failed: No conversion from dimension \'jsMoniker\' to \'WTF-THIS\' available. Valid dimensions: [jsReference,jsCode,jsTypeString,jsMoniker,jsonMoniker].'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion of 'jsMoniker' to 'jsCode' w/'value' set to bogus moniker value.",
    validConfig: false,
    request: {
        from: "jsMoniker",
        to: "jsCode",
        value: "WTF-THIS"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request \'value\' specifies unknown jsCode \'WTF-THIS\'. Valid dimensions: [jsReference,jsCode,jsTypeString,jsMoniker,jsonMoniker].'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion of 'jsMoniker' to 'jsCode' w/'value' set to bogus moniker value.",
    validConfig: false,
    request: {
        from: "jsMoniker",
        to: "jsCode",
        value: "WTF-THIS"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request \'value\' specifies unknown jsCode \'WTF-THIS\'. Valid dimensions: [jsReference,jsCode,jsTypeString,jsMoniker,jsonMoniker].'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request object: Conversion of 'jsReference' to 'jsMoniker' with invalid 'value'",
    validConfig: false,
    request: {
        from: "jsMoniker",
        to: "jsonMoniker",
        value: "WTF-THIS"
    },
    expectedResults: {
        error: 'CLUTS.request failed: Invalid request \'value\' specifies unknown jsonMoniker \'WTF-THIS\'. Valid dimensions: [jsReference,jsCode,jsTypeString,jsMoniker,jsonMoniker].'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request: Convert a jsMoniker to jsonMoniker with value 'jsUndefined'",
    validConfig: false,
    request: {
        from: "jsMoniker",
        to: "jsonMoniker",
        value: "jsUndefined"
    },
    expectedResults: {
        error: 'CLUTS.request failed: No coversion from dimension \'jsMoniker\' to \'jsonMoniker\' for value \'jsUndefined\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invalid request: Convert a jsMoniker to jsonMoniker with value 'jsFunction'",
    validConfig: false,
    request: {
        from: "jsMoniker",
        to: "jsonMoniker",
        value: "jsFunction"
    },
    expectedResults: {
        error: 'CLUTS.request failed: No coversion from dimension \'jsMoniker\' to \'jsonMoniker\' for value \'jsFunction\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Invlid request: Convert a jsReference to jsonMoniker with value function() {}",
    validConfig: false,
    request: {
        from: "jsReference",
        to: "jsonMoniker",
        value: function() { console.log("nope"); }
    },
    expectedResults: {
        error: 'CLUTS.request failed: No coversion from dimension \'jsTypeString\' to \'jsonMoniker\' for value \'[object Function]\'.'
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Classify undefined reference with 'value' missing from request.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
    },
    expectedResults: {
        result: 0
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Classify undefined reference with 'value' set to undefined.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
        value: undefined
    },
    expectedResults: {
        error: '',
        result: 0
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Classify undefined reference with 'value' set to null.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
        value: null
    },
    expectedResults: {
        error: '',
        result: 1
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Classify boolean reference with 'value' set to true.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
        value: true
    },
    expectedResults: {
        error: '',
        result: 2
    }
});


testCLUTS({
    cluts: CLUTS,
    testName: "Classify string reference with 'value' set to 'test' string.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
        value: "test"
    },
    expectedResults: {
        error: '',
        result: 3
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Classify string reference with 'value' set to 17 number.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
        value: 17
    },
    expectedResults: {
        error: '',
        result: 4
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Classify string reference with 'value' set to {} object.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
        value: {}
    },
    expectedResults: {
        error: '',
        result: 5
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Classify string reference with 'value' set to [] array.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
        value: []
    },
    expectedResults: {
        error: '',
        result: 6
    }
});



testCLUTS({
    cluts: CLUTS,
    testName: "Classify function reference with 'value' set to function.",
    validConfig: true,
    request: {
        from: "jsReference",
        to: "jsCode",
        value: function() { x = 5 }
    },
    expectedResults: {
        error: '',
        result: 7
    }
});

testCLUTS({
    cluts: CLUTS,
    testName: "Convert a jsMoniker to jsonMoniker with value 'jsArray'",
    validConfig: true,
    request: {
        from: "jsMoniker",
        to: "jsonMoniker",
        value: "jsArray"
    },
    expectedResults: {
        error: '',
        result: 'jsonArray'
    }
});






