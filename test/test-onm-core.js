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
            require('./core/test-core-ntcl');
        });

        describe("Class Identification Subsystem (CIDS) subsystem test suite.", function() {
            require('./core/test-core-cids');  // Class Identification Subsystem (CIDS)
        });

        describe("Plain-Old Data Subsystem (PODS) subsystem test suite.", function() {
            require('./core/test-core-pods');  // Plain-Old Data Subsystem (PODS) - depends on NTCL and CIDS
        });

        describe("Resource Address Space Processor (RASP) subsystem test suite.", function() {
            require('./core/test-core-rasp');
        });

        describe("Resource Identifier String Processor (RISP) subsystem test suite.", function() {
            require('./core/test-core-risp');
        });

        describe("Resource Location Transformation Processor (RLTP) subsystem test suite.", function() {
            require('./core/test-core-rltp');
        });

        describe("Data-Addressable Object Store (DAOS) subsystem test suite.", function() {
            require('./core/test-core-doas');
        });

        describe("Journal Notification Stream Processor (JNSP) subsystem test suite.", function() {
            require('./core/test-core-jnsp');
        });

        describe("Core Request Processor (CRP) subsystem test suite.", function() {
            require('./core/test-core-crp');   // Core Request Processor (CRP)
        });

    });

});



