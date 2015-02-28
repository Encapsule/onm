// test-use-case-ntcl-luts.js

var assert = require('chai').assert;


describe("Attempt to load the ntcl-luts module.", function() {

    LUTS = null
    CLUTSJSON = null
    error = null

    before(function() {
        var moduleLoader = function() {
            LUTS = require('../../../../lib/core/ntcl/ntcl-luts');
        };
        error = assert.doesNotThrow(moduleLoader, "The ntcl-luts module should be located and should load.");
    });

    it("The ntcl-luts module is expected to have loaded.", function() {
        assert.isDefined(LUTS);
        assert.isNotNull(LUTS);
        assert.isObject(LUTS);
    });

    it("The LUTS modules should export property 'cluts' of type object.", function() {
        assert.property(LUTS, 'cluts');
        assert.isObject(LUTS.cluts); // the validity of which is verified by test-use-case-ntcl-cluts.js
    });



});







