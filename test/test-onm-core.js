// test-onm-core-module-exports.js

var assert = require('chai').assert;

describe("Attempt to load the onm core module.", function() {

    var onmCore = null;
    var dab = 5;

    before(function(done_) {
        var moduleLoader = function() {
            onmCore = require('../lib/core/onm-core');
        };
        assert.doesNotThrow(moduleLoader, "ONM CORE MODULE SHOULD NEVER THROW ON LOAD.");
        done_();

    });

    it("onm core module should have loaded.", function() {
        assert.isDefined(onmCore);
        assert.isNotNull(onmCore);
    });

    it("onm core is expected to export an object.", function() {
        assert.isObject(onmCore);
    });

    it("onm core should export function 'request'.", function() {
        assert.property(onmCore, 'request');
        assert.isFunction(onmCore.request);
    });

    describe("Execute test suites for each of onm core's constituent subsystems.", function() {

        describe("Native Type Conversion Library (NTCL) subsystem test suite.", function() {
            require('./subtests/core/test-core-ntcl');
        });

        describe("Class Identification Subsystem (CIDS) subsystem test suite.", function() {
            require('./subtests/core/test-core-cids');  // Class Identification Subsystem (CIDS)
        });

        describe("Plain-Old Data Subsystem (PODS) subsystem test suite.", function() {
            require('./subtests/core/test-core-pods');  // Plain-Old Data Subsystem (PODS) - depends on NTCL and CIDS
        });

        describe("Core Request Processor (CRP) subsystem test suite.", function() {
            require('./subtests/core/test-core-crp');   // Core Request Processor (CRP)
        });

    });

});



