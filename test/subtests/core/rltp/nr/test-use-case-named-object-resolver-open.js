// test-impl-onm-descriptor-resolver.resolveOpen.js
//

var assert = require('chai').assert;
var withData = require('leche').withData;
var uuid = require('node-uuid');

var testModuleDependencies = require('./requires-dependencies');
var namedObjectResolver = testModuleDependencies.namedObjectResolver;
var namedObjectContext = testModuleDependencies.namedObjectContext;

var testData = testModuleDependencies.testData;
var testDataModel = testData.createModel();
var testDataRootAddress = testDataModel.address("*");
var testDataRootToken = testDataRootAddress.implementation.getLastToken();
var testDataRootDescriptor = testDataRootToken.namespaceDescriptor;

module.exports = describe("namedObjectResolver.resolve base 'open' strategy w/no data operation test.", function() {

    var resolveResults = null;
    var namedObjectResolveOptions = {
        strategy: 'open',
        parentDataReference: { 'addressBook': {} },
        targetNamespaceDescriptor: testDataRootDescriptor,
        semanticBindingsReference: testDataModel.getSemanticBindings(),
        propertyAssignmentObject: {}
    };

    before(function(done_) {
        var functionUnderTestWrapper = function() {
            resolveResults = namedObjectResolver.resolve(namedObjectResolveOptions);
        };
        assert.doesNotThrow(functionUnderTestWrapper);
        done_();
    });

    it("Function call should have returned an object.", function() {
        assert.isDefined(resolveResults);
        assert.isNotNull(resolveResults);
        assert.isObject(resolveResults);
    });

    it("The returned object should be a valid descriptor resolve results object.", function() {
        assert.isTrue(namedObjectContext.checkValidContextOutput(resolveResults));
    });

});


