// test-onm-core-module-exports.js

var assert = require('chai').assert;

describe("Attempt to load the onm core module.", function() {

    var onmCore = null;
    var dab = 5;

    before(function(done_) {
        var moduleLoader = function() {
            onmCore = require('../lib/core/onm-core');
        };
        assert.doesNotThrow(moduleLoader, "require('../lib/core/onm-core should not assert.");
        dab = onmCore.wrapDAB("test string");
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

    it("onm core should export function 'wrapDAB'.", function() {
        assert.property(onmCore, 'wrapDAB');
        assert.isFunction(onmCore.wrapDAB);
    });

    it("onm core should export function 'wrapDATA'.", function() {
        assert.property(onmCore, 'wrapDATA');
        assert.isFunction(onmCore.wrapDATA);
    });

    it("onm core should export function 'wrapJSON'.", function() {
        assert.property(onmCore, 'wrapJSON');
        assert.isFunction(onmCore.wrapJSON);
    });
    it("onm core should export function 'wrapRIS'.", function() {
        assert.property(onmCore, 'wrapRIS');
        assert.isFunction(onmCore.wrapRIS);
    });

    it("onm core should export function 'wrapXPOD'.", function() {
        assert.property(onmCore, 'wrapXPOD');
        assert.isFunction(onmCore.wrapXPOD);
    });

    describe("Execute subtest suites.", function() {

        require('./subtests/onm-core/test-use-case-core-wrap-pods');
        require('./subtests/onm-core/test-use-case-core-bad-requests');

    });

});



