// test-runner-cids-getCNAME.js

/*

  vector = {
      testName: string
      validConfig: boolean
      ref: 
      expectedResults: {
          error: string
          json: ''
      }

*/

var assert = require('chai').assert;

var dirRequires = require('./dir-requires');
var CIDS = dirRequires.CIDS;

module.exports = function (vector_) {

    describe("CIDS.getCNAME test runner: " + vector_.testName, function() {
        var response = null;
        before(function() {
            var functionUnderTest = function() {
                response = CIDS.getCNAME(vector_.ref);
            };
            assert.doesNotThrow(functionUnderTest, "ONM OPERATIONS SHOULD NEVER THROW!");
        });
        it("The call to getCNAME is expected to have returned a response.", function() {
            assert.isDefined(response);
            assert.isNotNull(response);
            assert.isObject(response);
        });
        if (vector_.validConfig) {
            it("The call is expected to have succeed.", function() {
                assert.isNull(response.error);
                assert.isDefined(response.result);
                assert.isNotNull(response.result);
            });
            it("The result should be an object.", function() {
                assert.isObject(response.result);
            });
            it("The result serialized to JSON should match the control value.", function() {
                assert.equal(JSON.stringify(response.result), vector_.expectedResults.json);
            });
        } else {
            it("The call is expected to have failed.", function() {
                assert.isDefined(response.error);
                assert.isNotNull(response.error);
                assert.isString(response.error);
                assert.isNull(response.result);
            });
            it("The error is expected to match expected control value.", function() {
                assert.equal(response.error, vector_.expectedResults.error);
            });
        }
    });
};
