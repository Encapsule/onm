// test-use-case-ntcl-cluts.js

var assert = require('chai').assert;
describe("Verify the production CLUTS leveraged by the NTCL's LUTS module is up-to-date.", function() {
    productionCLUTS = null
    generatedCLUTS_JSON = null
    describe("Attempt to load production CLUTS module.", function() {
        before(function() {
            var moduleLoader = function() {
                productionCLUTS = require('../../../../lib/core/ntcl/ntcl-cluts');
            };
            assert.doesNotThrow(moduleLoader, "The ntcl-cluts-production module should be found and should load.");
        });
        it("The ntcl-cluts-production module should have loaded returning an object.", function() {
            assert.isDefined(productionCLUTS);
            assert.isNotNull(productionCLUTS);
            assert.isObject(productionCLUTS);
        });
        describe("Attempt to load the CLUTS generator module.", function() {
            before(function() {
                var moduleLoader = function() {
                    generatedCLUTS_JSON = require('../../../../lib/core/ntcl/ntcl-cluts-generator');
                    //console.log("============================================================================");
                    //console.log("Latest generated:");
                    //console.log(generatedCLUTS_JSON);
                    //console.log("============================================================================");
                };
                assert.doesNotThrow(moduleLoader, "The ntcl-cluts-generator module should be found and should load.");
            });
            it("The ntcl-cluts-generator module should have loaded returning a string (JSON).", function() {
                assert.isDefined(generatedCLUTS_JSON);
                assert.isNotNull(generatedCLUTS_JSON);
                assert.isString(generatedCLUTS_JSON);
            });
            describe("Verify that the CLUTS leveraged in production onm v1 LUTS is up-to-date.", function() {
                productionCLUTS_JSON = null
                before(function() {
                    productionCLUTS_JSON = JSON.stringify(productionCLUTS);
                    //console.log("============================================================================");
                    //console.log("Production:");
                    //console.log(productionCLUTS_JSON);
                    //console.log("============================================================================");
                });
                it("The production CLUTS JSON should match the CLUTS JSON created by the most recent CLUTS generator module.", function() {
                    assert.equal(productionCLUTS_JSON, generatedCLUTS_JSON);
                });
            });
        });
    });
});

