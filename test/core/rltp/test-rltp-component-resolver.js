// test-impl-onm-component-resolver.js
//

var dirRequires = require('./dir-requires');

var assert = dirRequires.assert;
var withData = dirRequires.withData;
var uuid = dirRequires.uuid;
var onm = dirRequires.onm;
var testData = dirRequires.testData;

var testDataModel = testData.createModel();
var testDataRootAddress = testDataModel.address("*");
var testDataRootToken = testDataRootAddress.implementation.getLastToken();

var testExtensionPointAddress = testDataRootAddress.address("properties.subproperties.collection");
var testExtensionPointToken = testExtensionPointAddress.implementation.getLastToken();

var embeddedComponentAddress = testDataRootAddress.address("properties.subproperties.collection.someObject");
var embeddedComponentToken = embeddedComponentAddress.implementation.getLastToken();


module.exports = describe("Component resolver module test suite.", function() {

    componentResolver = null;

    before(function(done_) {
        var loadModuleUnderTest = function() {
            componentResolver = require('../../../lib/core/rltp/rltp-component-resolver');
        };
        assert.doesNotThrow(loadModuleUnderTest);
        done_();
    });

    it("componentResolver module should export an object.", function() {
        assert.isNotNull(componentResolver);
        assert.isDefined(componentResolver);
        assert.isObject(componentResolver);
    });

    describe("Verify the export signature of the component resolver module.", function() {
        it("componentResolver module export object should define property 'resolve' of type function.", function() {
            assert.property(componentResolver, 'resolve');
            assert.isFunction(componentResolver.resolve);
        });
    });

    describe("Component resolver implementation tests.", function() {

        describe("Open strategy with no data operation tests.", function() {
            require('./cr/test-use-case-component-resolver-open-noop-root');
            require('./cr/test-use-case-component-resolver-open-noop-subnamespace-1');
            require('./cr/test-use-case-component-resolver-open-noop-subnamespace-2');
            require('./cr/test-use-case-component-resolver-open-noop-subnamespace-N');
        });

        describe("Open strategy with data-over operation tests.", function() {
            require('./cr/test-use-case-component-resolver-open-apply-root-data-0');
            require('./cr/test-use-case-component-resolver-open-apply-root-data-1');
            require('./cr/test-use-case-component-resolver-open-apply-root-data-2');
            require('./cr/test-use-case-component-resolver-open-apply-root-data-N');
            require('./cr/test-use-case-component-resolver-open-apply-subnamespace-1-data-0');
            require('./cr/test-use-case-component-resolver-open-apply-subnamespace-1-data-1');
            require('./cr/test-use-case-component-resolver-open-apply-subnamespace-1-data-2');
            require('./cr/test-use-case-component-resolver-open-apply-subnamespace-2-data-0');
            require('./cr/test-use-case-component-resolver-open-apply-subnamespace-2-data-1');
            require('./cr/test-use-case-component-resolver-open-apply-subnamespace-2-data-2');
            require('./cr/test-use-case-component-resolver-open-apply-subnamespace-N-data-0');
        });

        describe("Create strategy with no data operation tests.", function() {
            require('./cr/test-use-case-component-resolver-create-noop-root');
            require('./cr/test-use-case-component-resolver-create-noop-subnamespace-1');
            require('./cr/test-use-case-component-resolver-create-noop-subnamespace-2');
            require('./cr/test-use-case-component-resolver-create-noop-subnamespace-N');
        });

        describe("Create strategy with data-over operation tests.", function() {
            require('./cr/test-use-case-component-resolver-create-apply-root-data-0');
            require('./cr/test-use-case-component-resolver-create-apply-root-data-1');
            require('./cr/test-use-case-component-resolver-create-apply-root-data-2');
            require('./cr/test-use-case-component-resolver-create-apply-root-data-N');
            require('./cr/test-use-case-component-resolver-create-apply-subnamespace-1-data-0');
            require('./cr/test-use-case-component-resolver-create-apply-subnamespace-1-data-1');
            require('./cr/test-use-case-component-resolver-create-apply-subnamespace-1-data-2');
            require('./cr/test-use-case-component-resolver-create-apply-subnamespace-2-data-0');
            require('./cr/test-use-case-component-resolver-create-apply-subnamespace-2-data-1');
        });

        describe("Negotiate strategy tests.", function() {
            require('./cr/test-use-case-component-resolver-negotiate-noop-root-exist');
            require('./cr/test-use-case-component-resolver-negotiate-noop-root-notexist');
            require('./cr/test-use-case-component-resolver-negotiate-apply-root-exist');
            require('./cr/test-use-case-component-resolver-negotiate-apply-root-notexist');
        });

        describe("Bad options tests.", function() {
            require('./cr/test-use-case-component-resolver-bogus-strategy');
        });

    });

});

