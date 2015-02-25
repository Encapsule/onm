// test-onm-core-module-exports.js

var assert = require('chai').assert;

var testOnmCoreRequest = require('./subtests/onm-core/test-runner-core-request');


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

    describe("I fucking hate Mocha.", function() {
        testOnmCoreRequest({
            testName: "first core request",
            validConfig: false,
            request: undefined,
            expectedResults: {
                error: 'onm.request failed: Missing required request object in-parameter.'
            }
        });

        testOnmCoreRequest({
            testName: "whatever",
            validConfig: false,
            request: {
                inputs: [ dab ],
                outputType: "DOA"
            },
            expectedResults: {
                error: 'onm.request failed: Invalid request object \'outputType\' value \'DOA\' is invalid.'
            }
        });
    });


});



