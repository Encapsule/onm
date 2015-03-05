// test-impl-onm-named-object-resolver.js
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
var testDataRootDescriptor = testDataRootToken.namespaceDescriptor;

module.exports = describe("Named object resolver module test suite.", function() {

    var namedObjectResolver = null;
    var namedObjectContext = null;

    before(function(done_) {
        var loadModuleUnderTest = function() {
            namedObjectResolver = require('../../../lib/core/rltp/rltp-named-object-resolver');
            namedObjectContext = require('../../../lib/core/rltp/rltp-named-object-context');
        };
        assert.doesNotThrow(loadModuleUnderTest);
        done_();
    });

    it("namedObjectResolver module should export an object.", function() {
        assert.isNotNull(namedObjectResolver);
        assert.isDefined(namedObjectResolver);
        assert.isObject(namedObjectResolver);
    });

    it("namedObjectContext module should export an object.", function() {
        assert.isNotNull(namedObjectContext);
        assert.isDefined(namedObjectContext);
        assert.isObject(namedObjectContext);
    });

    describe("Verify the export signature of the named object resolver module.", function() {
        it("namedObjectResolver module export object should define property 'resolve' of type function.", function() {
            assert.property(namedObjectResolver, 'resolve');
            assert.isFunction(namedObjectResolver.resolve);
        });
    });

    describe("Verify the export signature of the named object context module.", function() {
        it("namedObjectContext module export object should define property 'initializeContextObject' of type function.", function() {
            assert.property(namedObjectContext, 'initializeContextObject');
            assert.isFunction(namedObjectContext.initializeContextObject);
        });
        it("namedObjectContexst module export object should define property 'checkValidContextInput' of type function.", function() {
            assert.property(namedObjectContext, 'checkValidContextInput');
            assert.isFunction(namedObjectContext.checkValidContextInput);
        });
        it("namedObjectContext module export object should define property 'checkValidContextOutput' of type function.", function() {
            assert.property(namedObjectContext, 'checkValidContextOutput');
            assert.isFunction(namedObjectContext.checkValidContextOutput);
        });
    });

    describe("Named object resolver implementation test suite.", function() {
        require('./nr/test-use-case-named-object-resolver-context-input');
        require('./nr/test-use-case-named-object-resolver-context-output');
        require('./nr/test-use-case-named-object-resolver-open');
        require('./nr/test-use-case-named-object-resolver-create');
        require('./nr/test-use-case-named-object-resolver-negotiate');
    });

});

