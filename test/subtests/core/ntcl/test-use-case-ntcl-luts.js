// test-use-case-ntcl-luts.js

var assert = require('chai').assert;

describe("Attempt to load the ntcl-luts module.", function() {

    LUTS = null
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
        assert.isObject(LUTS.cluts);
    });

    it("Verify LUTS' constant look-up table, CLUTS.", function() {
        var expectedResult = '{"jsCode2jsTypeStringVector":["[object Undefined]","[object Null]","[object Boolean]","[object String]","[object Number]","[object Object]","[object Array]","[object Function]"],"jsCode2jsMonikerVector":["jsUndefined","jsNull","jsBoolean","jsString","jsNumber","jsObject","jsArray","jsFunction"],"jsCode2jsonMonikerVector":[null,"jsonNull","jsonBoolean","jsonString","jsonNumber","jsonObject","jsonArray",null],"jsMoniker2jsCodeHash":{"jsUndefined":0,"jsNull":1,"jsBoolean":2,"jsString":3,"jsNumber":4,"jsObject":5,"jsArray":6,"jsFunction":7},"jsTypeString2jsCodeHash":{"[object Undefined]":0,"[object Null]":1,"[object Boolean]":2,"[object String]":3,"[object Number]":4,"[object Object]":5,"[object Array]":6,"[object Function]":7},"jsMoniker2jsTypeStringHash":{"jsUndefined":"[object Undefined]","jsNull":"[object Null]","jsBoolean":"[object Boolean]","jsString":"[object String]","jsNumber":"[object Number]","jsObject":"[object Object]","jsArray":"[object Array]","jsFunction":"[object Function]"},"jsTypeString2jsMonikerHash":{"[object Undefined]":"jsUndefined","[object Null]":"jsNull","[object Boolean]":"jsBoolean","[object String]":"jsString","[object Number]":"jsNumber","[object Object]":"jsObject","[object Array]":"jsArray","[object Function]":"jsFunction"},"jsonMoniker2jsCodeHash":{"jsonNull":1,"jsonBoolean":2,"jsonString":3,"jsonNumber":4,"jsonObject":5,"jsonArray":6},"vectorLength":8}'
        var actualResult = JSON.stringify(LUTS.cluts);
        assert.equal(actualResult, expectedResult);
    });
});







