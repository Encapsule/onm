// test-impl-onm-xri-parser.js

var Address = require('../../../lib/onm-address');
var xriParser = require('../../../lib/impl/onm-xri');

var assert = require('chai').assert;

/*
  testVector = {
      testName: "test name"
      validConfig: true/false
      xri: "//.//.v.x"
      model: onm.Model
      addressBase: onm.Address
      expectedResults: {
          uri:
          lri:
          error:
      }
   };
*/

var runXRIParserTest = module.exports = function (testVector_) {

    describe("onm xRI parser test case: " + testVector_.testName + ":", function() {

        var xriParseResponse = null

        before(function() {
            var runFunctionUnderTest = function() {
                xriParseResponse = xriParser.parse({
                    model: testVector_.model,
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
            assert.isTrue( (xriParseResponse.result === null) || (xriParseResponse.result instanceof Address) );
        });

        if (testVector_.validConfig) {

            describe("The xRI parser was supposed to succeed. Confirm the results match expectations.", function() {

                it("xriParseResponse.error is expected to be null.", function() {
                    assert.isNull(xriParseResponse.error);
                });

                it("xriParseResponse.result is expected to be non-null object of type onm.Address.", function() {
                    assert.isNotNull(xriParseResponse.result);
                    assert.instanceOf(xriParseResponse.result, Address);
                });

                describe("Convert the result onm.Address back into onm-format URI and LRI and compare against expected results.", function() {

                    var uri = null;
                    var lri = null;

                    before(function() {
                        var convertAddressToURI = function() {
                            uri = xriParseResponse.result.uri();
                        };
                        var convertAddressToLRI = function() {
                            lri = xriParseResponse.result.lri();
                        };
                        assert.doesNotThrow(convertAddressToURI);
                        assert.doesNotThrow(convertAddressToLRI);
                    });

                    it("The result URI should match the expected result URI.", function() {
                        assert.equal(uri, testVector_.expectedResults.uri);
                    });

                    it("The result LRI should match the expected result LRI.", function() {
                        assert.equal(lri, testVector_.expectedResults.lri);
                    });

                });

            });

        } else {

            describe("The xRI parser was supposed to fail. Confirm no results and expected error.", function() {

                it("xriParseResponse.result is expected to be null.", function() {
                    assert.isNull(xriParseResponse.result);
                });

                it("xriParseResponse.error is expected to be a non-null string.", function() {
                    assert.isNotNull(xriParseResponse.error);
                    assert.isString(xriParseResponse.error);
                });

                it("xriParseResponse.error string is expected to match the exepcted result.", function() {
                    assert.equal(xriParseResponse.error, testVector_.expectedResults.error);
                });

            });



        }

    });

};

