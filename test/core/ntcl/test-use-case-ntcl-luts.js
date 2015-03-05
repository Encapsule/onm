// test-use-case-ntcl-luts.js

var assert = require('chai').assert;


describe("Attempt to load the ntcl-luts module.", function() {

    LUTS = null
    CLUTSJSON = null
    error = null

    before(function() {
        var moduleLoader = function() {
            LUTS = require('../../../lib/core/ntcl/ntcl-luts');
        };
        error = assert.doesNotThrow(moduleLoader, "The ntcl-luts module should be located and should load.");
    });

    it("The ntcl-luts module is expected to have loaded.", function() {
        assert.isDefined(LUTS);
        assert.isNotNull(LUTS);
        assert.isObject(LUTS);
    });

    it("The LUTS module should export property 'jsCodes' of type object.", function() {
        assert.property(LUTS, 'jsCodes');
        assert.isObject(LUTS.jsCodes);
    });

    it("The LUTS module should export property 'dimensions' of type array.", function() {
        assert.property(LUTS, 'dimensions');
        assert.isArray(LUTS.dimensions);
    });

    it("The LUTS module should export property 'request' of type function.", function() {
        assert.property(LUTS, 'request');
        assert.isFunction(LUTS.request);
    });

    it("The LUTS module should export property 'refInJsTypeSet' of type function.", function() {
        assert.property(LUTS, 'refInJsTypeSet');
        assert.isFunction(LUTS.refInJsTypeSet);
    });

    it("The LUTS module should export property 'refValidJsonType' of type function.", function() {
        assert.property(LUTS, 'refValidJsonType');
        assert.isFunction(LUTS.refValidJsonType);
    });



});







