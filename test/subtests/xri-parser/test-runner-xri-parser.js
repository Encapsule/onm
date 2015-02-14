// test-impl-onm-xri-parser.js

var Address = require('../../../lib/onm-address');

var assert = require('chai').assert;
var testData = require('./fixture/address-book-data-model');

var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();


var xriParser = require('../../../lib/impl/onm-xri-parser');

/*
  testVector = {
      testName: "test name"
      validConfig: true/false
      xri: "//.//.v.x"
      addressBase: onm.Address
      expectedResults: {
          uri:
          lri:
          errorMessage:
      }
   };
*/

var runXRIParserTest = function (testVector_) {

    describe("onm xRI parser test case: " + testVector_.testName + ":", function() {

        xriParseResponse = null

        before(function() {
            var runFunctionUnderTest = function() {
                xriParseResponse = xriParser.parse({
                    addressBase: testVector_.addressBase,
                    xri: testVector_.xri
                });
            };
            assert.doesNotThrow(runFunctionUnderTest);
        });

        it("xriParser.parse should have returned a response object.", function() {
            assert.isDefined(xriParseResponse);
            assert.isNotNull(xriParseResponse);
            assert.isObject(xriParseResponse);
        });

        it("xriParseResponse object is expected to have property 'error'.", function() {
            assert.property(xriParseResponse, 'error');
        });

        it("xriParseResponse.error is expected to be null or a string.", function() {
            assert.isTrue( (xriParseResponse.error === null) || (Object.prototype.toString.call(xriParseResponse.error) === '[object String]') );
        });

        it("xriParseResponse object is expected to have property 'result'.", function() {
            assert.property(xriParseResponse, 'result');
        });

        it("xriParseResponse.result is expected to be null or an object of type onm.Address.", function() {
            assert.true( (xriParseResponse.result === null) || (xriParseResponse.result instanceof Address) );
        });




    });

};

