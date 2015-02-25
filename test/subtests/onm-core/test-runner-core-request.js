// test-runner-core-request.js
//

var assert = require('chai').assert;

/*
  testVector = {
      testName: string
      validConfig: boolean
      request: object
      expectedResults: {
          error: string if !validConfig
      }
  }
*/

var onmCore = require('../../../lib/core/onm-core');


module.exports = function (testVector_) {

    describe("onm core request test runner: " + testVector_.testName, function() {

        response = null

        before(function() {
            var requestRunner = function() {
                response = onmCore.request(testVector_.request);
            };
            assert.doesNotThrow(requestRunner, "onm core requests should never throw.");
        });

        it("The request should have executed.", function() {
            assert.isDefined(response);
            assert.isNotNull(response);
        });

        if (testVector_.validConfig) {
            it("request.error should be null", function() {
                assert.isNull(response.error);
            });
            it("request.result should not be null.", function() {
                assert.isNotNull(response.result);
            });
        } else {
            it("request.error should not be null", function() {
                assert.isNotNull(response.error);
                assert.isString(response.error);
            });
            it("request.error string should match control value.", function() {
                assert.equal(response.error, testVector_.expectedResults.error);
            });
            it("request.result should not be null.", function() {
                assert.isNull(response.result);
            });
        }
            
    });


};

