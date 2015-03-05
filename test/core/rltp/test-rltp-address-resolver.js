// test-impl-onm-address-resolver.js
//

var dirRequires = require('./dir-requires');

var assert = require('chai').assert;
var onm = dirRequires.onm;
var testData = dirRequires.testData;

var testDataModel = testData.createModel();
var rootAddress = testDataModel.address("*");
var testObjectAddress = rootAddress.address("properties.subproperties.collection.someObject");

describe("Validate the behavior of the onm address resolver.", function() {

    var addressResolver = null;

    before(function() {
        var loadModule = function() {
            addressResolver = require('../../../lib/core/rltp/rltp-address-resolver');
        };
        assert.doesNotThrow(loadModule);
    });

    it("addressResolver module should export an object.", function() {
        assert.isNotNull(addressResolver);
        assert.isDefined(addressResolver);
        assert.isObject(addressResolver);
    });

    describe("Verify the export signature of the address resolver module.", function() {
        it("addressResolver module export object should define property 'resolve' of type function.", function() {
            assert.property(addressResolver, 'resolve');
            assert.isFunction(addressResolver.resolve);
        });
    });

    describe("Address resolver implementation tests.", function() {

        describe("Create strategy with no data operation tests.", function() {
            require('./ar/test-use-case-address-resolver-create-noop-0.js');
            require('./ar/test-use-case-address-resolver-create-noop-1.js');
            require('./ar/test-use-case-address-resolver-create-noop-2.js');
            require('./ar/test-use-case-address-resolver-create-noop-RN.js');
        });

        describe("Create strategy with data-over operation tests.", function() {
            require('./ar/test-use-case-address-resolver-create-apply-0-1.js');
            require('./ar/test-use-case-address-resolver-create-apply-0-N.js');
            require('./ar/test-use-case-address-resolver-create-apply-1-1.js');
            require('./ar/test-use-case-address-resolver-create-apply-1-N.js');
            require('./ar/test-use-case-address-resolver-create-apply-2-1.js');
            require('./ar/test-use-case-address-resolver-create-apply-2-N.js');
            require('./ar/test-use-case-address-resolver-create-apply-N-N.js');
        });

        describe("Open strategy with no data operation tests.", function() {
            require('./ar/test-use-case-address-resolver-open-noop-0.js');
            require('./ar/test-use-case-address-resolver-open-noop-1.js');
            require('./ar/test-use-case-address-resolver-open-noop-2.js');
            require('./ar/test-use-case-address-resolver-open-noop-RN.js');
        });

        describe("Open strategy with data-over operation tests.", function() {
            require('./ar/test-use-case-address-resolver-open-apply-0-1.js');
            require('./ar/test-use-case-address-resolver-open-apply-0-N.js');
            require('./ar/test-use-case-address-resolver-open-apply-1-1.js');
            require('./ar/test-use-case-address-resolver-open-apply-1-N.js');
            require('./ar/test-use-case-address-resolver-open-apply-2-1.js');
            require('./ar/test-use-case-address-resolver-open-apply-2-N.js');
        });

    });

});
